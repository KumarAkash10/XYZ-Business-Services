# Deployment Guide - ListIndia Business Directory

This guide covers deployment strategies for the ListIndia Business Directory platform.

## 🚀 Production Deployment

### Prerequisites
- Node.js 16+ installed on server
- PostgreSQL 12+ database
- Domain name and SSL certificate
- Process manager (PM2 recommended)

### Backend Deployment

#### 1. Server Setup
```bash
# Install PM2 globally
npm install -g pm2

# Clone repository
git clone <repository-url>
cd listIndia/backend

# Install dependencies
npm install --production

# Set up environment variables
cp .env.example .env
# Edit .env with production values
```

#### 2. Environment Configuration
```env
NODE_ENV=production
PORT=5000
DB_HOST=your-production-db-host
DB_NAME=business_directory_prod
DB_USER=your-db-user
DB_PASSWORD=your-secure-password
JWT_SECRET=your-super-secure-jwt-secret
FRONTEND_URL=https://yourdomain.com
```

#### 3. Database Setup
```bash
# Create production database
createdb business_directory_prod

# Run migrations (if using Sequelize CLI)
npm run db:migrate

# Seed initial data
npm run db:seed
```

#### 4. Start with PM2
```bash
# Start application
pm2 start server.js --name "listindia-api"

# Save PM2 configuration
pm2 save

# Set up auto-restart on server reboot
pm2 startup
```

### Frontend Deployment

#### 1. Build for Production
```bash
cd listIndia/frontend

# Install dependencies
npm install

# Create production build
npm run build
```

#### 2. Serve with Nginx
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Serve React build files
    location / {
        root /path/to/listIndia/frontend/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # Proxy API requests to backend
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🐳 Docker Deployment

### Docker Compose Setup
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:13
    environment:
      POSTGRES_DB: business_directory
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: your_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: production
      DB_HOST: postgres
      DB_NAME: business_directory
      DB_USER: postgres
      DB_PASSWORD: your_password
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

## ☁️ Cloud Deployment Options

### 1. Heroku
- Easy deployment with Git integration
- Automatic SSL certificates
- Built-in PostgreSQL add-on

### 2. AWS
- EC2 for server hosting
- RDS for PostgreSQL database
- CloudFront for CDN
- Route 53 for DNS

### 3. DigitalOcean
- Droplets for server hosting
- Managed PostgreSQL database
- App Platform for easy deployment

### 4. Vercel (Frontend) + Railway (Backend)
- Vercel for React frontend deployment
- Railway for Node.js backend and database

## 🔒 Security Checklist

- [ ] Use HTTPS in production
- [ ] Set secure JWT secret (32+ characters)
- [ ] Configure CORS for production domain only
- [ ] Enable rate limiting
- [ ] Set up database backups
- [ ] Configure monitoring and logging
- [ ] Use environment variables for secrets
- [ ] Enable security headers (Helmet.js)
- [ ] Regular security updates

## 📊 Monitoring

### Application Monitoring
```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs listindia-api

# Restart application
pm2 restart listindia-api
```

### Database Monitoring
- Monitor connection pool usage
- Set up automated backups
- Monitor query performance
- Set up alerts for high CPU/memory usage

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Install dependencies
      run: |
        cd backend && npm install
        cd ../frontend && npm install
    
    - name: Run tests
      run: |
        cd backend && npm test
        cd ../frontend && npm test
    
    - name: Build frontend
      run: cd frontend && npm run build
    
    - name: Deploy to server
      # Add your deployment script here
```

## 🚨 Troubleshooting

### Common Issues
1. **Database connection errors**: Check environment variables and network connectivity
2. **CORS errors**: Verify FRONTEND_URL in backend .env
3. **Build failures**: Check Node.js version compatibility
4. **SSL certificate issues**: Verify certificate installation and renewal

### Logs Location
- Backend logs: PM2 logs or `/var/log/listindia/`
- Nginx logs: `/var/log/nginx/`
- Database logs: PostgreSQL log directory
