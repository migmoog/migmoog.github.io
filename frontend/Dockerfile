FROM node:20 
WORKDIR /app

# copy everything required excluding node_modules
COPY package.json package-lock.json ./
COPY vite.config.js ./
COPY src ./src
COPY public ./public
COPY index.html ./

RUN npm install
ENTRYPOINT ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Expose the port the app runs on for browser fun!
EXPOSE 5173