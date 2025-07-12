FROM node:20-alpine AS builder
WORKDIR /app

# copy everything required excluding node_modules
COPY package.json package-lock.json ./
COPY vite.config.js ./
COPY src ./src
COPY .env ./
COPY public ./public
COPY index.html ./

RUN npm ci
RUN npm run build

# Serve stage
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./
RUN npm install -g serve
CMD ["serve", "-s", ".", "-l", "5173"]
EXPOSE 5173