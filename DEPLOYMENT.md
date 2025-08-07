# Deployment Guide

## Production Build

To prepare the application for deployment, run:

```bash
./scripts/deploy.sh
```

Or manually:

```bash
npm run build
cp -r dist/public server/public
```

## Production Start

The application is configured to run in production mode with:

```bash
cd dist
NODE_ENV=production node index.js
```

## Health Checks

The application provides health check endpoints for monitoring:

- `/health` - Comprehensive health status with uptime and environment info
- `/ready` - Simple readiness probe

## Deployment Features

✅ **Environment Configuration**: Automatic NODE_ENV setup for production  
✅ **Port Binding**: Binds to 0.0.0.0 for deployment compatibility  
✅ **Static File Serving**: Production assets served from correct directory  
✅ **Error Handling**: Graceful startup error handling and shutdown  
✅ **Health Monitoring**: Built-in endpoints for deployment monitoring  

## Troubleshooting

- **Port Issues**: Server automatically uses PORT environment variable or defaults to 5000
- **Static Files**: Build process copies files from `dist/public` to `server/public`
- **Health Checks**: Use `/health` endpoint to verify deployment status