# Gunakan image Maven untuk build
FROM maven:3.9.6-eclipse-temurin-17 AS builder

# Set working directory
WORKDIR /app

# Copy semua file ke container
COPY . .

# Build aplikasi (skip test agar lebih cepat)
RUN mvn clean package -DskipTests

# Stage kedua: image yang lebih kecil
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Salin jar hasil build dari stage builder
COPY --from=builder /app/target/*.jar app.jar

# Jalankan aplikasi
ENTRYPOINT ["java", "-jar", "app.jar"]