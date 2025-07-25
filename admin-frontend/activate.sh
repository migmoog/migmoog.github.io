#!/bin/bash

echo "🚀 Starting Admin Panel with CORS disabled..."

# Start the admin frontend
cd admin-frontend
npm run dev &
ADMIN_PID=$!

LOCAL_IP=$(hostname -I | awk '{print $1}')

# Wait for Vite to start
sleep 3

# Launch Chrome with CORS disabled in a separate window
google-chrome \
    --disable-web-security \
    --user-data-dir="/tmp/chrome_admin_$(date +%s)" \
    --disable-features=VizDisplayCompositor \
    --ignore-certificate-errors \
    --allow-running-insecure-content \
    --no-default-browser-check \
    --no-first-run \
    --disable-default-apps \
    --disable-popup-blocking \
    --disable-prompt-on-repost \
    --disable-background-timer-throttling \
    --disable-renderer-backgrounding \
    --disable-backgrounding-occluded-windows \
    --disable-ipc-flooding-protection \
    --app=http://$LOCAL_IP:5175 &
CHROME_PID=$!

echo "Admin panel running on $LOCAL_IP"
echo "Press Ctrl+C to stop everything"

cleanup() {
    echo "🛑 Stopping admin panel..."
    kill $ADMIN_PID 2>/dev/null
    kill $CHROME_PID 2>/dev/null
    echo "✅ Admin panel stopped"
    exit 0
}

trap cleanup SIGINT
wait