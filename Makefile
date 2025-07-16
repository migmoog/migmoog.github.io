.PHONY: build deps

build:
	docker compose -f docker-compose.yml build

up:
	docker compose -f docker-compose.yml up --build

frontend/node_modules:
	@cd frontend && npm i
run-frontend: frontend/node_modules
	@cd frontend && npm run dev

backend/.venv:
	python3 -m venv backend/.venv
backend-deps: backend/.venv
	. backend/.venv/bin/activate && pip install -r backend/requirements.txt

activate-db:
	docker compose up -d db

BACKEND_CMD=uvicorn --app-dir backend main:app --host 0.0.0.0 --port 5174
run-backend: backend-deps activate-db
	. backend/.venv/bin/activate && $(BACKEND_CMD)

local-test: activate-db
	(. backend/.venv/bin/activate && $(BACKEND_CMD)) \
		& (cd frontend && npm run dev)