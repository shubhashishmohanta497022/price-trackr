# Price Trackr Deployment Guide

## Prerequisites

### System Requirements
- Linux server (Ubuntu 20.04+ recommended)
- Docker and Docker Compose
- At least 4GB RAM
- 20GB available disk space
- Domain name (optional)

### Software Dependencies
- Docker 20.10+
- Docker Compose 2.0+
- Git
- Nginx (if not using Docker)

## Quick Start (Docker Compose)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/price-trackr.git
cd price-trackr
```

### 2. Environment Configuration
```bash
cp .env.example .env
nano .env
```

Configure these variables:
```env
# Database
DATABASE_URL=postgresql://postgres:your_password@postgres:5432/price_trackr
REDIS_URL=redis://redis:6379

# Security
SECRET_KEY=your-super-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Email Configuration
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
EMAIL_ADDRESS=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# External URLs
VITE_API_BASE_URL=http://your-domain.com
VITE_WS_URL=ws://your-domain.com
```

### 3. Deploy Services
```bash
cd infra
docker-compose up -d
```

### 4. Verify Deployment
```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f worker
```

### 5. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Production Deployment

### 1. Server Preparation

#### Update System
```bash
sudo apt update && sudo apt upgrade -y
```

#### Install Docker
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

#### Install Docker Compose
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Application Setup

#### Create Application Directory
```bash
sudo mkdir -p /opt/price-trackr
sudo chown $USER:$USER /opt/price-trackr
cd /opt/price-trackr
```

#### Clone and Configure
```bash
git clone https://github.com/yourusername/price-trackr.git .
cp .env.example .env
```

#### Production Environment
```env
# Production settings
NODE_ENV=production
DEBUG=false

# Database (use strong passwords)
DATABASE_URL=postgresql://postgres:STRONG_PASSWORD@postgres:5432/price_trackr

# Security (generate strong keys)
SECRET_KEY=your-super-secure-secret-key-here

# Domain configuration
VITE_API_BASE_URL=https://your-domain.com
VITE_WS_URL=wss://your-domain.com

# Email (use app passwords)
EMAIL_ADDRESS=alerts@your-domain.com
EMAIL_PASSWORD=your-app-specific-password
```

### 3. SSL/TLS Configuration

#### Generate SSL Certificate (Let's Encrypt)
```bash
sudo apt install certbot
sudo certbot certonly --standalone -d your-domain.com
```

#### Update Nginx Configuration
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # SSL optimization
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Rest of configuration...
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

### 4. Database Setup

#### Initialize Database
```bash
docker-compose exec backend python -c "
from app.database import engine, Base
from app.models import *
Base.metadata.create_all(bind=engine)
print('Database initialized successfully')
"
```

#### Run Migrations (if using Alembic)
```bash
docker-compose exec backend alembic upgrade head
```

### 5. Service Management

#### Create Systemd Service
```bash
sudo cp infra/systemd/price-trackr.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable price-trackr
sudo systemctl start price-trackr
```

#### Service Commands
```bash
# Start services
sudo systemctl start price-trackr

# Stop services
sudo systemctl stop price-trackr

# Restart services
sudo systemctl restart price-trackr

# Check status
sudo systemctl status price-trackr
```

## Monitoring and Maintenance

### 1. Health Checks

#### Service Health
```bash
# Check all services
docker-compose ps

# Check individual service health
curl http://localhost:8000/health
curl http://localhost:8080/health
```

#### Database Health
```bash
docker-compose exec postgres pg_isready -U postgres
```

### 2. Backup Strategy

#### Database Backup
```bash
# Create backup directory
mkdir -p /opt/price-trackr/backups

# Backup script
#!/bin/bash
BACKUP_DIR="/opt/price-trackr/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="price_trackr_backup_$TIMESTAMP.sql"

docker-compose exec -T postgres pg_dump -U postgres price_trackr > "$BACKUP_DIR/$BACKUP_FILE"
gzip "$BACKUP_DIR/$BACKUP_FILE"

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete
```

#### Automated Backups
```bash
# Add to crontab
crontab -e

# Daily backup at 2 AM
0 2 * * * /opt/price-trackr/scripts/backup.sh
```

### 3. Log Management

#### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f worker

# Follow logs with timestamp
docker-compose logs -f -t backend
```

#### Log Rotation
```bash
# Configure in docker-compose.yml
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### 4. Performance Monitoring

#### Resource Usage
```bash
# Docker stats
docker stats

# System resources
htop
df -h
free -h
```

#### Application Metrics
- Monitor API response times
- Track scraper success rates
- Database query performance
- WebSocket connections

## Scaling

### 1. Horizontal Scaling

#### Multiple Worker Instances
```yaml
# docker-compose.yml
services:
  worker:
    # ... existing config
    deploy:
      replicas: 3
```

#### Load Balancing
```nginx
upstream backend {
    server backend1:8000;
    server backend2:8000;
    server backend3:8000;
}
```

### 2. Database Scaling

#### Read Replicas
- Configure PostgreSQL streaming replication
- Route read queries to replicas
- Keep writes on primary

#### Connection Pooling
```python
# Increase connection pool size
engine = create_engine(
    DATABASE_URL,
    pool_size=20,
    max_overflow=0,
    pool_pre_ping=True
)
```

## Security Hardening

### 1. Firewall Configuration
```bash
# UFW setup
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 2. Docker Security
```bash
# Run containers as non-root
USER 1000:1000

# Read-only root filesystem
--read-only

# Drop capabilities
--cap-drop=ALL
```

### 3. Application Security
- Regular dependency updates
- Security headers in Nginx
- Rate limiting
- Input validation
- CORS configuration

## Troubleshooting

### Common Issues

#### Service Won't Start
```bash
# Check logs
docker-compose logs service_name

# Check configuration
docker-compose config

# Restart specific service
docker-compose restart service_name
```

#### Database Connection Issues
```bash
# Check database status
docker-compose exec postgres pg_isready

# Test connection
docker-compose exec backend python -c "
from app.database import engine
try:
    engine.connect()
    print('Database connection successful')
except Exception as e:
    print(f'Database connection failed: {e}')
"
```

#### High Memory Usage
```bash
# Check container resources
docker stats

# Restart services to free memory
docker-compose restart
```

### Performance Issues

#### Slow API Responses
- Check database query performance
- Monitor PostgreSQL slow query log
- Optimize database indexes
- Enable Redis caching

#### Scraper Timeouts
- Increase scraper timeouts
- Add more worker instances
- Implement retry mechanisms
- Monitor target site performance

## Updates and Maintenance

### 1. Application Updates
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart services
docker-compose build --no-cache
docker-compose up -d
```

### 2. Dependency Updates
```bash
# Update base images
docker-compose pull

# Rebuild with new dependencies
docker-compose build --pull
```

### 3. Database Migrations
```bash
# Run migrations
docker-compose exec backend alembic upgrade head

# Check migration status
docker-compose exec backend alembic current
```

## Support and Resources

### Documentation
- API documentation: `/docs` endpoint
- System architecture: `docs/system-architecture.md`
- Scraper guide: `docs/scraper-guide.md`

### Monitoring
- Application logs
- System metrics
- Database performance
- User analytics

### Backup and Recovery
- Regular database backups
- Configuration backups
- Disaster recovery procedures
