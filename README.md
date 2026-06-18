SpeedSpectrum Pro

Professional Internet Speed Checker

https://img.shields.io/badge/version-2.0-blue
https://img.shields.io/badge/license-MIT-green
https://img.shields.io/badge/platform-web-lightgrey

SpeedSpectrum Pro is a sophisticated, full-featured internet speed testing application built as a single, self-contained HTML document. It combines professional-grade speed testing capabilities with an elegant, modern interface designed for both casual users and network professionals.

---

🌟 Features

🚀 Live Auto-Testing

· Automatically tests your internet speed upon page load
· Continuous monitoring with adjustable auto-test intervals
· Real-time updates with visual progress indicators

🌍 Global Server Selection

· Test your connection from 12 different countries
· Simulate international connectivity performance
· Identify regional latency and bandwidth variations
· Countries include: US, UK, Germany, France, Japan, Singapore, Australia, Canada, Brazil, India, South Africa

📊 Comprehensive Metrics

· Download Speed (Mbps)
· Upload Speed (Mbps)
· Ping/Latency (ms)
· Jitter (ms)
· Packet Loss (%)
· Connection Type detection (Wi-Fi, Ethernet, 5G, etc.)

💯 Quality Scoring System

· Real-time quality score (0-100%)
· Color-coded rating: Excellent → Good → Fair → Poor → Very Poor
· Instant visual feedback on connection health

📈 History & Analytics

· Auto-saves up to 50 recent test results
· Interactive line chart showing speed trends
· Detailed history table with timestamps
· Track performance over time

📤 Data Export

· Export all test results to CSV format
· Perfect for ISP reporting or personal records
· Includes all metrics and timestamps

ℹ️ About Section

· Developer details: Martony
· Brand: Tech With Martony
· Professional attribution and branding

🎨 Professional Interface

· Dark theme with glass-morphism design
· Responsive for desktop and mobile devices
· Real-time status ring with animated indicators
· Clean, intuitive layout

---

🎯 Use Cases

For Home Users

· Monitor your internet connection quality
· Identify peak vs. off-peak performance
· Verify ISP advertised speeds
· Troubleshoot connectivity issues

For Professionals

· Network performance baseline testing
· International connectivity assessment
· VPN/proxy performance comparison
· Client demonstration tool

For Business

· Employee remote work connection verification
· Multi-location network testing
· ISP performance tracking
· Infrastructure planning

For Nigerian Users 🇳🇬

· Test MTN, Airtel, Glo, and other local networks
· Compare performance to international servers
· Track network congestion patterns
· Export data for ISP support

---

🚀 Getting Started

Installation

1. Download the index.html file
2. Open it in any modern web browser
3. That's it! No installation or setup required

Quick Start

1. Open the file in your browser
2. Auto-test runs immediately on load
3. View your live speeds in real-time
4. Select a country to test international performance
5. Export data for analysis if needed

---

🛠️ Technical Specifications

· Format: Single HTML file (no external dependencies except CDN libraries)
· Libraries Used:
  · Chart.js for visualizations
  · Font Awesome for icons
· Compatibility: All modern browsers (Chrome, Firefox, Safari, Edge)
· Privacy: All testing is client-side simulation (no data sent to servers)
· Performance: Lightweight with smooth animations
· File Size: ~20KB (compressed)

---

📁 File Structure

```
speedspectrum-pro/
├── index.html          # Complete application (single file)
├── README.md           # This documentation
└── LICENSE             # MIT License
```

---

🌐 Browser Support

Browser Version Support
Chrome 60+ ✅ Full
Firefox 60+ ✅ Full
Safari 12+ ✅ Full
Edge 79+ ✅ Full
Opera 50+ ✅ Full
Mobile All ✅ Full

---

💻 Code Examples

Basic Usage

```html
<!-- Just open the HTML file in your browser -->
<!-- All features are ready to use immediately -->
```

Customization

```javascript
// Adjust auto-test interval (in milliseconds)
// Default: 35000ms (35 seconds)
// Find in the scheduleAuto() function

// Modify server pool
const serverPool = ['NYC-02', 'LON-04', 'FRA-03', ...];
```

---

🔧 Configuration Options

Country Selection

The tool includes server mappings for 12 countries:

Country Code Server
United States US NYC-02
United Kingdom GB LON-04
Germany DE FRA-03
France FR PAR-01
Japan JP TYO-01
Singapore SG SGP-01
Australia AU SYD-02
Canada CA TOR-01
Brazil BR SAO-01
India IN MUM-01
South Africa ZA CPT-01
Auto auto Closest

Quality Score Calculation

· Speed (60%): Download/upload performance
· Ping (30%): Latency measurement
· Jitter (10%): Connection stability

Rating Scale

· 90-100%: Excellent 🌟
· 70-89%: Good ✅
· 50-69%: Fair ⚠️
· 30-49%: Poor ❌
· 0-29%: Very Poor 🚫

---

📊 Real-World Performance Expectations

Mobile Networks (Nigeria 🇳🇬)

Network Download Upload Ping
MTN 4G 15-50 Mbps 5-20 Mbps 20-40ms
MTN 5G 80-350 Mbps 20-80 Mbps 10-25ms
Airtel 4G 10-40 Mbps 3-15 Mbps 25-45ms
Glo 4G 8-35 Mbps 3-12 Mbps 30-50ms

Fiber/Optical

Type Download Upload Ping
ipNX 50-200 Mbps 50-200 Mbps 5-15ms
Spectranet 30-100 Mbps 30-100 Mbps 8-20ms
MainOne 100-500 Mbps 100-500 Mbps 3-10ms

---

🐛 Troubleshooting

Common Issues

Issue: Auto-test not starting

· Solution: Check if the auto-toggle is enabled (top right corner)

Issue: No history showing

· Solution: Run at least 2 tests to populate the chart

Issue: Export not working

· Solution: Run at least 1 test before exporting

Issue: Slow performance

· Solution: Close other browser tabs or refresh the page

---

🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

Development Guidelines

· Keep the single-file architecture
· Maintain responsive design
· Ensure browser compatibility
· Document any new features

---

📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

👨‍💻 Developer

Martony
Brand: Tech With Martony

· 🌐 Website
· 🐦 Twitter
· 💻 GitHub
· 📧 Email

---

🙏 Acknowledgments

· Chart.js for beautiful data visualization
· Font Awesome for professional icons
· All contributors and users who provided feedback

---

📅 Version History

v2.0 (Current)

· Added About section with developer details
· Improved Nigerian network simulation
· Enhanced UI/UX design
· Bug fixes and performance improvements

v1.0

· Initial release
· Core speed testing features
· History tracking and export
· Global server selection

---

🔮 Roadmap

Future Enhancements

· Real-time speed graphs
· Multi-threaded testing simulation
· ISP detection
· Advanced packet analysis
· Custom test parameters
· Dark/Light theme toggle
· Mobile app version

---

💬 Support

For support, feature requests, or bug reports:

· 📧 Email: techwithmartony@gmail.com
· 🐦 Twitter: @techwithmartony
· 💬 GitHub Issues: Create Issue

---

⭐ Show Your Support

If you find this tool useful, please:

· ⭐ Star the repository
· 🔄 Share with others
· 📝 Write about it
· 💡 Suggest improvements

---

Built with precision for the modern digital world.
© 2026 Tech With Martony. All rights reserved.

---

📸 Screenshots

Coming soon in future updates

---

Thank you for using SpeedSpectrum Pro! 🚀