# Multi-stage Dockerfile for UniCore ERP Spring Boot Backend

# Stage 1: Build Java Application with Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source files and package jar
COPY src ./src
RUN mvn package -DskipTests -B

# Stage 2: Production JRE Execution Environment
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create non-root system user for security
RUN addgroup -S unicore && adduser -S unicore -G unicore
USER unicore:unicore

# Copy built JAR artifact from build stage
COPY --from=build /app/target/unicore-erp-backend-*.jar app.jar

EXPOSE 8080

# Configure memory constraints & garbage collector for production
ENTRYPOINT ["java", "-XX:+UseG1GC", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
