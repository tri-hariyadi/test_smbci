# Stage 1: Build React App
FROM node:22.17.0-alpine as builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN #npm ci

# Copy source files and build
COPY . .
RUN yarn install
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:1.25-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built React files from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Optional: custom nginx config (optional, if needed)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port and start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
