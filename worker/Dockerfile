# Use the official Playwright image from Microsoft's container registry.
# This image comes with Python and all necessary browser binaries (Chromium, Firefox, WebKit)
# and their system-level dependencies pre-installed, which is a massive convenience.
FROM mcr.microsoft.com/playwright/python:v1.44.0-jammy

# Set the working directory inside the container. All subsequent commands
# will be run from this path.
WORKDIR /usr/src/app

# It's a best practice to copy and install requirements first.
# Docker caches this layer, so it won't re-install dependencies every time
# you change your application code, speeding up the build process.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# This command is commented out because the base image already includes the browsers.
# If you were using a standard Python image, you would need this line to install
# the browser binaries and their dependencies inside the container.
# RUN playwright install --with-deps chromium

# Copy the rest of the worker's application code into the container.
COPY ./playwright_scraper ./playwright_scraper

# Specify the default command to run when the container starts.
# This command starts the RQ worker, which will begin listening for jobs
# on the Redis queue defined in the runner.py script.
CMD ["python", "playwright_scraper/runner.py"]