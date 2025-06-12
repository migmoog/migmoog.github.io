.PHONY: build

build:
	docker compose -f docker-compose.yml build

up:
	docker compose -f docker-compose.yml up --build