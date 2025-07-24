## Gunakan image Maven untuk build
#FROM maven:3.9.6-eclipse-temurin-17 AS builder
#
## Set working directory
#WORKDIR /app
#
## Copy semua file ke container
#COPY . .
#
## Build aplikasi (skip test agar lebih cepat)
#RUN mvn clean package -DskipTests
#
## Stage kedua: image yang lebih kecil
#FROM eclipse-temurin:17-jdk-alpine
#
## Set working directory
#WORKDIR /app
#
## Salin jar hasil build dari stage builder
#COPY --from=builder /app/target/*.jar app.jar
#
## Jalankan aplikasi
#ENTRYPOINT ["java", "-jar", "app.jar"]

#FROM openjdk:17-jdk-slim AS build
#WORKDIR /app
#COPY school-library-server/pom.xml .
#RUN mvn dependency:go-offline
#COPY school-library-server/ .
#RUN mvn clean install
#
#FROM openjdk:17-jdk-slim
#WORKDIR /app
#COPY --from=build /app/target/school-library-server.jar /app/school-library-server.jar
#ENTRYPOINT ["java", "-jar", "/app/school-library-server.jar"]
#EXPOSE 8080

#FROM maven:3.9.6-eclipse-temurin-17 AS build
#WORKDIR /app
#COPY pom.xml .
#RUN mvn dependency:go-offline -B
#COPY src ./src
#RUN ls -lah
#RUN mvn package -DskipTests
#
#FROM openjdk:17-jdk-slim
#WORKDIR /app
#COPY --from=build /app/target/school-library-server.jar /app/school-library-server.jar
#ENTRYPOINT ["java", "-jar", "/app/school-library-server.jar"]

FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY school-library-server/pom.xml .
RUN mvn dependency:go-offline -B
COPY school-library-server/src ./src
RUN mvn package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/school-library-server.jar /app/school-library-server.jar
ENTRYPOINT ["java", "-jar", "/app/school-library-server.jar"]