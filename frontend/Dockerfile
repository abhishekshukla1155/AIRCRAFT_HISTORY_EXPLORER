# ==========================================
# Frontend Dockerfile for AeroChronicles
# ==========================================

# --- Stage 1: Build stage ---
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to cache npm dependencies layer
COPY package.json package-lock.json /app/

# Install dependencies
RUN npm install

# Declare build arguments (Vite requires build-time injection of environment variables)
ARG VITE_API_URL

# Set environment variable from build argument so Vite picks it up
ENV VITE_API_URL=$VITE_API_URL

# Copy the rest of the application files
COPY . /app/

# Run the production build command (Vite compiles assets into /app/dist)
RUN npm run build


# --- Stage 2: Production runtime stage ---
FROM nginx:1.25-alpine

# Copy custom Nginx configuration to enable SPA routing, security headers, and compression
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from the build stage to Nginx web root directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose standard HTTP port
EXPOSE 80

# Start Nginx server in the foreground
CMD ["nginx", "-g", "daemon off;"]
