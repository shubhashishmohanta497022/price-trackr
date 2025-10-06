🗺️ Project Roadmap: Price Trackr
This document outlines the planned features and strategic direction for the Price Trackr project. The roadmap is a living document and may evolve based on user feedback and technical feasibility.

✅ v1.0: Minimum Viable Product (MVP) - (Current Version)
The initial release focuses on establishing a stable, self-hostable, and functional core system.

[x] Core Tracking Engine: Add products via URL and track prices.

[x] Multi-Site Support: Functional scrapers for initial sites (Amazon, Flipkart).

[x] Historical Data: Store and display price history on a chart.

[x] User Accounts: Secure user registration and login with JWT.

[x] Personal Watchlists: Users can manage their own list of tracked products.

[x] Real-time UI: Basic WebSocket push for live updates.

[x] Dockerized Deployment: Full stack deployment with a single docker-compose.yml.

[x] Secure Hosting: Nginx reverse proxy with SSL (HTTPS) via Certbot.

[x] Basic Browser Extension: A functional Manifest v3 extension.

⏳ v1.1: Quality of Life & Expansion - (Short-Term)
This phase focuses on enhancing the user experience and expanding the platform's reach.

[ ] Expanded Notification Channels:

[ ] Email notifications for price drops.

[ ] Telegram bot notifications.

[ ] More Scrapers: Add support for more popular e-commerce sites (e.g., Myntra, Croma, Ajio).

[ ] Advanced Alerts:

[ ] "Back in Stock" notifications.

[ ] Percentage-based drop alerts (e.g., "notify me on a 10% drop").

[ ] Improved UI/UX:

[ ] Add historical price charts directly to the browser extension popup.

[ ] User-configurable dashboard widgets.

[ ] "Lowest Ever Price" badge on product cards.

[ ] User Analytics: A personal dashboard for users to see their total potential savings.

🚀 v1.2: Intelligence & Community Features - (Mid-Term)
This phase aims to make the tracker smarter and more collaborative.

[ ] AI-Powered Price Forecasting:

[ ] Analyze historical data to predict whether a price is likely to rise or fall.

[ ] Display a "Good Time to Buy" indicator.

[ ] Community Deal Discussions:

[ ] A comments section on each product page for users to share deals, reviews, and advice.

[ ] Crowdsourced Offline Prices: Allow users to submit prices they find in physical stores to track local deals.

[ ] Advanced Scam Detection:

[ ] Analyze page content and user reviews for signs of fake products or scams.

[ ] Import/Export Watchlist: Allow users to export their watchlist to CSV/JSON and import from other services.

🌌 v2.0: Platform Ecosystem - (Long-Term Vision)
The long-term vision is to evolve Price Trackr from a tool into a comprehensive deal-finding ecosystem.

[ ] Official Mobile Apps:

[ ] Cross-platform mobile application built with Flutter for iOS and Android.

[ ] Public API: Offer a documented public API for developers to build their own tools on top of the Price Trackr data.

[ ] Expanded Browser Support: Release official extensions for Firefox and Safari.

[ ] Internationalization (i18n): Full support for multiple languages and currencies.

[ ] Plugin System: Allow the community to develop and share their own scrapers as plugins.

🙌 Contributing
This is an open-source project. If you are interested in contributing to any of the features listed above, please check