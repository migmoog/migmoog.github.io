#!/bin/bash

echo "Starting DB"
docker compose up -d db
sleep 3

echo "Starting backend"
cd backend
if [ ! -d ".venv" ]; then
    echo "Initializing venv"
    python3 -m venv .venv
fi

source .venv/bin/activate
pip install -r requirements.txt
ENV=dev uvicorn main:app --host 0.0.0.0 --port 5174 --reload &
BACKEND_PID=$!
cd ..

node_deps() {
    if [ ! -d "node_modules" ]; then
        echo "Installing frontend deps"
        npm install
    fi
}

echo "Starting user frontend"
cd frontend
node_deps
npm run dev -- --port 5173 &
FRONTEND_PID=$!
cd ..

echo "Starting admin frontend (port 5174)"
cd admin-frontend
node_deps
npm run dev -- --port 5175 &
ADMIN_PID=$!
cd .. 

echo "All services started"
echo "Backend: http://localhost:5174"
echo "Frontend: http://localhost:5173"
echo "Admin Frontend: http://localhost:5175"
echo "Press Ctrl+C to stop it"

cleanup() {
    echo "Killing services"
    pkill -f "uvicorn main:app"
    pkill -f "vite. *5173"
    pkill -f "vite. *5175"
    pkill -f "uvicorn main:app"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    kill $ADMIN_PID 2>/dev/null
    docker compose stop db
    exit 0
}

trap cleanup SIGINT
wait