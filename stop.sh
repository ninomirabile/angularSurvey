#!/bin/bash

# Survey App Stop Script
# This script stops the Angular Survey application

echo "🛑 Stopping Survey App..."

# Find and kill Angular development server processes
echo "🔍 Looking for Angular development server processes..."

# Kill ng serve processes
PIDS=$(pgrep -f "ng serve")
if [ ! -z "$PIDS" ]; then
    echo "📋 Found Angular processes: $PIDS"
    echo "💀 Terminating processes..."
    pkill -f "ng serve"
    
    # Wait a moment and check if processes are still running
    sleep 2
    REMAINING_PIDS=$(pgrep -f "ng serve")
    if [ ! -z "$REMAINING_PIDS" ]; then
        echo "⚠️  Some processes are still running. Force killing..."
        pkill -9 -f "ng serve"
    fi
    
    echo "✅ Angular development server stopped successfully!"
else
    echo "ℹ️  No Angular development server processes found."
fi

# Check if port 4200 is still in use
if lsof -Pi :4200 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 4200 is still in use. Checking for other processes..."
    lsof -ti:4200 | xargs kill -9
    echo "✅ Port 4200 freed."
else
    echo "✅ Port 4200 is free."
fi

echo "🎉 Survey App stopped successfully!" 