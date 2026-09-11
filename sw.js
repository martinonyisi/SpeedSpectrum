/* ============================================================
   SpeedSpectrum Pro — Service Worker
   Strategy:
     • Precache the app shell (index.html, manifest, icons).
     • Network-first for HTML navigations (so users get updates).
     • Cache-first for static assets, CDNs, and icons.
     • Network-first with cache fallback for API calls (IP detection).
     • Offline fallbacks for 404 / 403 / 500 / offline routes.
   ============================================================ */

const VERSION = 'v4.3.0';
const SHELL_CACHE   = `speedshell-${VERSION}`;
const RUNTIME_CACHE = `speedruntime-${VERSION}`;
const CDN_CACHE     = `speedcdn-${VERSION}`;

/* App shell — the minimum needed to render the UI offline. */
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/Speed.png',
  '/offline.html',
  '/404.html',
  '/403.html',
  '/500.html'
];

/* CDN assets used by the app (Chart.js, Font Awesome, jsPDF). */
const CDN_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js'
];

/* ---------------------------------------------------------- */
/* Install — precache the shell and CDN assets                 */
/* ---------------------------------------------------------- */
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const shell = await caches.open(SHELL_CACHE);
      // Use addAll with a fallback: if one asset fails, don't kill install
      await Promise.all(
        SHELL_ASSETS.map((url) =>
          shell.add(new Request(url, { cache: 'reload' })).catch((err) => {
            console.warn('[SW] Skipped shell asset:', url, err);
          })
        )
      );

      const cdn = await caches.open(CDN_CACHE);
      await Promise.all(
        CDN_ASSETS.map((url) =>
          cdn.add(new Request(url, { mode: 'cors', credentials: 'omit' })).catch((err) => {
            console.warn('[SW] Skipped CDN asset:', url, err);
          })
        )
      );

      // Activate immediately (page will control the update toast)
      self.skipWaiting();
    })()
  );
});

/* ---------------------------------------------------------- */
/* Activate — clean up old caches                              */
/* ---------------------------------------------------------- */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([SHELL_CACHE, RUNTIME_CACHE, CDN_CACHE]);
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => (keep.has(key) ? null : caches.delete(key)))
      );

      // Enable navigation preload if supported (faster HTML loads)
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }

      await self.clients.claim();
    })()
  );
});

/* ---------------------------------------------------------- */
/* Message channel — page asks SW to skip waiting for updates  */
/* ---------------------------------------------------------- */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/* ---------------------------------------------------------- */
/* Helpers                                                     */
/* ---------------------------------------------------------- */
const isHTMLRequest = (request) =>
  request.mode === 'navigate' ||
  (request.method === 'GET' &&
    request.headers.get('accept') &&
    request.headers.get('accept').includes('text/html'));

const isAPIRequest = (url) =>
  url.hostname.includes('jaiho-ip.vercel.app') ||
  url.hostname.includes('ip-api.com');

const isCDNRequest = (url) =>
  url.hostname.includes('cdn.jsdelivr.net') ||
  url.hostname.includes('cdnjs.cloudflare.com') ||
  url.hostname.includes('fonts.googleapis.com') ||
  url.hostname.includes('fonts.gstatic.com');

/* Pick the right offline fallback based on the error status. */
function fallbackForStatus(status) {
  if (status === 403) return '/403.html';
  if (status === 404) return '/404.html';
  if (status >= 500)  return '/500.html';
  return '/offline.html';
}

/* ---------------------------------------------------------- */
/* Fetch — orchestrates every request                          */
/* ---------------------------------------------------------- */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET. Let everything else pass through.
  if (request.method !== 'GET') return;

  /* ---------- 1. HTML navigations: network-first, offline fallback ---------- */
  if (isHTMLRequest(request)) {
    event.respondWith(
      (async () => {
        try {
          // Prefer preload response if it exists (navigation preload)
          const preload = await event.preloadResponse;
          if (preload) return preload;

          const networkResponse = await fetch(request);

          // If the server returns 4xx/5xx, swap in the matching fallback page
          if (!networkResponse.ok) {
            const fallbackUrl = fallbackForStatus(networkResponse.status);
            const cachedFallback = await caches.match(fallbackUrl);
            return cachedFallback || networkResponse;
          }

          // Cache a fresh copy for offline use
          const cache = await caches.open(SHELL_CACHE);
          cache.put('/', networkResponse.clone());
          return networkResponse;
        } catch (err) {
          // Offline → serve cached shell, then fallback
          const cached = (await caches.match(request)) || (await caches.match('/'));
          return cached || (await caches.match('/offline.html'));
        }
      })()
    );
    return;
  }

  /* ---------- 2. IP / API calls: network-first, no long cache ---------- */
  if (isAPIRequest(url)) {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          // Cache briefly for graceful degradation offline
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(request, networkResponse.clone());
          return networkResponse;
        } catch (err) {
          const cached = await caches.match(request);
          if (cached) return cached;
          // Return a tiny JSON so the app's IP widget can degrade gracefully
          return new Response(
            JSON.stringify({ error: 'offline', ip: null }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          );
        }
      })()
    );
    return;
  }

  /* ---------- 3. CDN assets: cache-first (long-lived) ---------- */
  if (isCDNRequest(url)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;

        try {
          const networkResponse = await fetch(request, { mode: 'cors', credentials: 'omit' });
          const cache = await caches.open(CDN_CACHE);
          cache.put(request, networkResponse.clone());
          return networkResponse;
        } catch (err) {
          // Give back whatever we have
          return cached || Response.error();
        }
      })()
    );
    return;
  }

  /* ---------- 4. Same-origin static: cache-first, then network ---------- */
  if (url.origin === self.location.origin) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;

        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          const fallbackUrl = fallbackForStatus(404);
          const fallback = await caches.match(fallbackUrl);
          return fallback || Response.error();
        }
      })()
    );
    return;
  }

  /* ---------- 5. Everything else: default (no interception) ---------- */
});