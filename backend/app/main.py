from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.config import settings
from app.database import engine, Base
from app.api.products import router as products_router
from app.api.alerts import router as alerts_router
from app.api.users import router as users_router
from app.api.sales import router as sales_router
from app.websocket.tracker_ws import WebSocketManager

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create tables
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    Base.metadata.create_all(bind=engine)
    logger.info("Application startup complete")
    yield
    # Shutdown
    logger.info("Application shutdown")

app = FastAPI(
    title="Price Trackr API",
    description="A comprehensive price tracking API",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(products_router, prefix="/api/products", tags=["products"])
app.include_router(alerts_router, prefix="/api/alerts", tags=["alerts"])
app.include_router(users_router, prefix="/api/users", tags=["users"])
app.include_router(sales_router, prefix="/api/sales", tags=["sales"])

# WebSocket manager
ws_manager = WebSocketManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await ws_manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await ws_manager.send_personal_message(f"You wrote: {data}", websocket)
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)

@app.get("/")
async def root():
    return {"message": "Welcome to Price Trackr API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
