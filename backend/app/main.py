from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api import products, sales, alerts, users
from .config import settings
from .database import engine, Base
from .websocket.tracker_ws import router as websocket_router

# If you run alembic migrations manually, this line is not strictly needed.
# However, it can be useful for initial setup or testing without migrations.
# Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="A self-hosted, open-source price tracking solution.",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/v1/openapi.json"
)

# In a real production environment, you should be more restrictive
# with your allowed origins. This configuration is permissive for development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/api/health", tags=["System"])
async def health_check():
    """
    Simple health check endpoint to confirm the API is running.
    """
    return {"status": "ok", "project": settings.PROJECT_NAME}

# Include API routers from other files
app.include_router(products.router, prefix="/api/v1/products", tags=["Products"])
app.include_router(sales.router, prefix="/api/v1/sales", tags=["Sales"])
app.include_router(alerts.router, prefix="/api/v1/alerts", tags=["Alerts"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(websocket_router, prefix="/ws", tags=["WebSocket"])

