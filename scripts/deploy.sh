#!/bin/bash
# Deployment script for production build

# Set strict error handling
set -e

echo "Building application for production..."

# Build the frontend and backend
npm run build

# Copy static files to the location expected by the server
echo "Copying static files..."
rm -rf server/public
cp -r dist/public server/public

echo "Deployment build complete!"
echo "Files ready for production deployment"