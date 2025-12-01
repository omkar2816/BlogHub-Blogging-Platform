# BlogHub Docker Deployment Guide

This guide explains how to deploy the BlogHub application using Docker.

## Prerequisites

- Docker and Docker Compose installed
- MongoDB Atlas account (recommended) or local MongoDB
- Cloudinary account for image uploads

## Quick Start

1. **Clone and setup environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

2. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build -d
   ```

3. **Access the application:**
   - Frontend: http://localhost
   - Backend API: http://localhost:5000
   - MongoDB (if using local): localhost:27017

## Environment Configuration

Update `.env` file with your values:

```env
# Required: MongoDB Atlas connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-web-application

# Required: JWT secret (generate strong random string)
JWT_SECRET=your-super-secure-jwt-secret

# Required: Cloudinary config
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Deployment Options

### Option 1: With MongoDB Atlas (Recommended)
```bash
# Use your existing .env with Atlas connection
docker-compose up --build -d
```

### Option 2: With Local MongoDB
```bash
# Uncomment mongodb service in docker-compose.yml
# Update MONGO_URI in .env to: mongodb://admin:password@mongodb:27017/blog-web-application?authSource=admin
docker-compose up --build -d
```

### Option 3: Production Deployment
```bash
# Build for production
docker-compose -f docker-compose.prod.yml up --build -d
```

## Docker Commands

```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Remove all containers and volumes
docker-compose down -v

# Restart specific service
docker-compose restart backend
docker-compose restart frontend

# Shell into container
docker exec -it bloghub-backend sh
docker exec -it bloghub-frontend sh
```

## Monitoring

- **Health Check**: http://localhost:5000/health
- **Backend Logs**: `docker logs bloghub-backend`
- **Frontend Logs**: `docker logs bloghub-frontend`

## Troubleshooting

1. **Port conflicts**: Change ports in docker-compose.yml
2. **MongoDB connection**: Verify MONGO_URI in .env
3. **CORS issues**: Update allowed origins in backend/server.js
4. **Build failures**: Check Docker logs and ensure all dependencies are available

## File Upload Storage

- Uploaded images are stored in Docker volume `backend-uploads`
- For production, consider using cloud storage (AWS S3, Cloudinary)

## Security Notes

- Use strong JWT_SECRET in production
- Whitelist specific origins in CORS configuration
- Use environment variables for all sensitive data
- Consider using Docker secrets for production deployment