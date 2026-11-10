# Multi-Stage Unified Production Dockerfile for Render / Cloud Deployment

# Stage 1: Build React + Vite Frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# Stage 2: Build Spring Boot 3.x Backend with Embedded Frontend Assets
FROM maven:3.9.6-eclipse-temurin-17 AS backend-build
WORKDIR /app/backend

# Copy Maven pom file
COPY backend/pom.xml ./
RUN mvn dependency:go-offline -B

# Copy Java backend source code
COPY backend/src ./src

# Copy built frontend dist files into Spring Boot static resources directory
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static

# Package single production executable JAR
RUN mvn package -DskipTests -B

# Stage 3: Production JRE Execution Container
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create non-root system user
RUN addgroup -S unicore && adduser -S unicore -G unicore
USER unicore:unicore

# Copy executable JAR
COPY --from=backend-build /app/backend/target/unicore-erp-backend-*.jar app.jar

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-XX:+UseG1GC", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
