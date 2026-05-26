# ==========================================
# Backend Dockerfile for AeroChronicles API
# ==========================================

# Use an official, lightweight Python slim image supporting Django 6.0+ (requires Python >= 3.12)
FROM python:3.12-slim AS builder

# Prevent Python from writing .pyc files to disk
ENV PYTHONDONTWRITEBYTECODE=1

# Prevent Python from buffering stdout and stderr for immediate logging
ENV PYTHONUNBUFFERED=1

# Disable debian frontend prompt during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies needed to build packages like psycopg2 if required
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy only the requirements file first to take advantage of Docker caching
COPY requirements.txt /app/

# Install dependencies into a virtual environment or directly into the global container path
# We use --no-cache-dir to keep the image slim
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Final stage: Use a clean runtime image to keep the production image size minimal
FROM python:3.12-slim

# Copy runtime environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install runtime library dependencies (like libpq for postgres connection)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Copy installed python dependencies from build stage
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy the rest of the application code
COPY . /app/

# Create a non-privileged user and group for running the container securely
RUN groupadd -g 10001 appgroup && \
    useradd -u 10001 -g appgroup -m -s /bin/bash appuser

# Create directory for static and media files and adjust permissions
RUN mkdir -p /app/staticfiles /app/media && \
    chown -R appuser:appgroup /app

# Switch to the non-privileged user
USER appuser

# Expose Django backend default port
EXPOSE 8000

# Collect static files into STATIC_ROOT (WhiteNoise will serve them)
# We can do this in the build stage since it doesn't need database connection
RUN python manage.py collectstatic --noinput

# Run gunicorn server on port 8000
# - Binds to all interfaces (0.0.0.0)
# - Binds port 8000
# - Spawns 3 worker processes (Rule of thumb: 2-4 workers per core)
# - Spawns 2 threads per worker for concurrent connections
# - Redirects access logs to stdout (-)
CMD ["sh", "-c", "python manage.py migrate && gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --workers 3 --threads 2 --access-logfile -"]
