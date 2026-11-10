# Multi-stage Dockerfile for UniCore ERP React + Vite Frontend

# Stage 1: Build static web assets with Node.js
FROM node:20-alpine AS build
WORKDIR /app

# Copy package.json
COPY package*.json ./
RUN npm install

# Copy source code and build Vite production bundle
COPY . .
RUN npm run build

# Stage 2: Serve production assets with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
