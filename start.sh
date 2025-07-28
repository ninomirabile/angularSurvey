#!/bin/bash

# Survey App Startup Script
# This script starts the Angular Survey application

echo "🚀 Starting Survey App..."

# Check if we're in the right directory
if [ ! -d "survey-app" ]; then
    echo "❌ Error: survey-app directory not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

# Navigate to the survey-app directory
cd survey-app

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Error: Failed to install dependencies!"
        exit 1
    fi
fi

# Check if port 4200 is already in use
if lsof -Pi :4200 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 4200 is already in use. Stopping existing process..."
    pkill -f "ng serve"
    sleep 2
fi

# Start the Angular development server
echo "🌐 Starting Angular development server..."
echo "📱 Application will be available at: http://localhost:4200"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

npm start 