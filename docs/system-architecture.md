🏗️ System Architecture: Price Trackr
This document provides a high-level overview of the Price Trackr system architecture, its components, and the flow of data between them.

1. Core Philosophy
The entire system is designed around a set of core principles:

Zero Cost: Utilizes free, open-source software (FOSS) exclusively, with no reliance on paid APIs or services.

Self-Hosted: Built to run entirely on a single, user-controlled Virtual Private Server (VPS).

Containerized: All components are isolated in Docker containers, orchestrated by Docker Compose for easy deployment and management.

Scalable & Modular: A clean separation of concerns between the frontend, backend, and worker allows for independent development, testing, and scaling.

2. Component Breakdown
The application is a microservices-oriented architecture composed of six core services running in Docker containers.


Getty Images
Service

Technology

Responsibility

Nginx

Nginx

Reverse Proxy & SSL Termination. The single entry point for all web traffic. It routes requests to the appropriate service (frontend or backend) and handles HTTPS encryption.

Frontend

React (Vite) + TS

User Interface. A modern single-page application (SPA) that the user interacts with. It communicates with the backend via a REST API and WebSockets.

Backend

FastAPI (Python)

API & Business Logic. The brain of the application. It handles user authentication, manages database interactions, and dispatches tasks to the worker.

PostgreSQL

PostgreSQL

Primary Datastore. A relational database that stores all persistent data, including users, products, and historical price logs.

Redis

Redis

Cache & Job Queue. Serves two critical roles: 1) As a message broker for the RQ job queue. 2) As a high-speed cache for temporary data (optional).

Worker

Playwright + RQ

Scraping Engine. A background process that listens for scraping jobs on the Redis queue, runs Playwright to scrape websites, and saves the results to the PostgreSQL database.

3. Data Flow & Request Lifecycle
Understanding the flow of data is key to understanding the system.

Architectural Diagram
graph TD
    subgraph User Browser
        A[User]
    end

    subgraph "VPS (Docker Network)"
        B(Nginx Reverse Proxy)
        C(Frontend - React)
        D(Backend - FastAPI)
        E(Worker - Playwright)
        F(PostgreSQL DB)
        G(Redis - RQ Queue)
    end

    A -- HTTPS Request --> B

    subgraph "Request Routing"
        B -- Serves UI --> C
        B -- Proxies API Call --> D
        B -- Proxies WebSocket --> D
    end
    
    C -- API Calls --> D
    D -- Reads/Writes Data --> F
    D -- Enqueues Job --> G
    
    E -- Listens for Jobs --> G
    E -- Scrapes --> H[External E-commerce Site]
    E -- Writes Scraped Data --> F
