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
RUN ls -lah
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
RUN ls -lah
COPY --from=build /app/target/schoollibrary-0.0.1-SNAPSHOT.jar /app/schoollibrary-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "/app/schoollibrary-0.0.1-SNAPSHOT.jar"]