# Price Trackr System Architecture

## Overview

Price Trackr is a comprehensive price monitoring application built with a microservices architecture. The system consists of multiple components working together to provide real-time price tracking, alerts, and analytics.

## Architecture Components

### 1. Frontend (React + TypeScript)
- **Technology**: React 18, TypeScript, Vite, Tailwind CSS
- **Purpose**: User interface for managing products, viewing analytics, and configuring alerts  
- **Features**:
  - Responsive dashboard
  - Product management
  - Real-time price updates via WebSocket
  - Price history charts
  - Alert configuration

### 2. Backend API (FastAPI)
- **Technology**: Python, FastAPI, SQLAlchemy, PostgreSQL
- **Purpose**: Core business logic, data management, and API endpoints
- **Features**:
  - RESTful API endpoints
  - User authentication & authorization
  - Product management
  - Price history tracking
  - Alert system
  - WebSocket for real-time updates

### 3. Worker Service (Playwright)
- **Technology**: Python, Playwright, FastAPI
- **Purpose**: Web scraping service for price data collection
- **Features**:
  - Multi-platform scrapers (Amazon, Flipkart, Myntra, etc.)
  - Anti-bot detection measures
  - Concurrent scraping
  - Task queue management
  - Error handling & retry logic

### 4. Browser Extension
- **Technology**: JavaScript, Chrome Extension API
- **Purpose**: Easy product addition from e-commerce sites
- **Features**:
  - One-click product tracking
  - Automatic product data extraction
  - Integration with main application

### 5. Database Layer
- **Primary Database**: PostgreSQL
  - User data
  - Product information  
  - Price history
  - Alert configurations
- **Cache Layer**: Redis
  - Session management
  - Task queue
  - Real-time data caching

## Data Flow

```
Browser Extension → Backend API → Database
                                ↓
Worker Service ← Task Queue ← Scheduler
     ↓
Price Data → Backend API → WebSocket → Frontend
```

## Key Features

### Real-time Price Monitoring
- Scheduled scraping jobs
- Real-time price updates
- WebSocket notifications

### Intelligent Alerts
- Price drop notifications
- Email alerts
- Custom threshold settings

### Analytics & Insights
- Price history visualization
- Trend analysis
- Sale detection

### Multi-platform Support
- Amazon India
- Flipkart
- Myntra
- Croma
- Ajio

## Security Considerations

- JWT-based authentication
- Input validation & sanitization
- Rate limiting
- CORS configuration
- Secure cookie handling

## Scalability

- Microservices architecture
- Horizontal scaling capability
- Load balancing with Nginx
- Database connection pooling
- Redis for caching and queues

## Deployment

- Docker containerization
- Docker Compose orchestration
- Nginx reverse proxy
- Systemd service management
