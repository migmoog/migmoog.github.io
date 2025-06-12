FROM golang:1.22-alpine

WORKDIR /app

# Install SQLite driver for Go
RUN apk add --no-cache gcc musl-dev sqlite

# Copy Go source code
COPY main.go ./
COPY init.sql ./

# Install Go SQLite driver
RUN go mod init backend && \
    go get github.com/mattn/go-sqlite3 && \
    go get github.com/lib/pq

# Build the Go backend
RUN go build -o backend main.go

# Set environment variable for database file location
ENV DATABASE_URL=/app/test.db

# On container start, initialize the database if it doesn't exist
CMD ["/bin/sh", "-c", "if [ ! -f /app/test.db ]; then sqlite3 /app/test.db < /app/init.sql; fi && ./backend"]

EXPOSE 5174