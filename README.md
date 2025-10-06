# Price Trackr 📊

A comprehensive price tracking application that monitors product prices across multiple e-commerce platforms and alerts users when prices drop.

## Features

- 🔍 **Multi-Platform Scraping**: Track prices from Amazon, Flipkart, Myntra, Croma, and Ajio
- 🚨 **Smart Alerts**: Get notified via email when prices drop below your target
- 📈 **Price History**: View detailed price trends and analytics
- 🌐 **Real-time Updates**: WebSocket-powered live price updates
- 🎯 **Sale Detection**: Automatic detection of sales and discounts
- 🔌 **Browser Extension**: Quick product addition from any e-commerce site
- 📱 **Responsive UI**: Beautiful, mobile-friendly interface built with React + Tailwind

## Architecture

- **Backend**: FastAPI + PostgreSQL + Redis
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Worker**: Playwright-based web scraping service
- **Extension**: Chrome/Firefox browser extension
- **Infrastructure**: Docker + Nginx + systemd

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/price-trackr.git
cd price-trackr
```

2. Start with Docker Compose:
```bash
cd infra
docker-compose up -d
```

3. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Documentation

- [System Architecture](docs/system-architecture.md)
- [API Reference](docs/api-reference.md)
- [Scraper Guide](docs/scraper-guide.md)
- [Deployment Guide](docs/deployment-guide.md)
- [Roadmap](docs/roadmap.md)

## Contributing

We welcome contributions! Please read our contributing guidelines and submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
