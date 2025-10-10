# Stage 1: Build stage with build dependencies
FROM python:3.12-slim AS builder

WORKDIR /app

# Install poetry
RUN pip install poetry

# Copy only dependency-defining files
COPY poetry.lock pyproject.toml ./

# Configure Poetry to create the venv in the project directory
RUN poetry config virtualenvs.in-project true

# Install dependencies without installing the project itself
RUN poetry install --no-root

# Stage 2: Final stage with minimal dependencies
FROM python:3.12-slim

WORKDIR /app

# Copy virtual env from builder
COPY --from=builder /app/.venv /.venv

# Activate virtual env
ENV PATH="/app/.venv/bin:$PATH"

# Copy application code
COPY . .

# Set alembic config path
ENV ALEMBIC_CONFIG=alembic.ini

