from fastapi import WebSocket, WebSocketDisconnect
from typing import List, Dict, Any
import json
import asyncio
import logging

logger = logging.getLogger(__name__)

class WebSocketManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.user_connections: Dict[int, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, user_id: int = None):
        await websocket.accept()
        self.active_connections.append(websocket)

        if user_id:
            if user_id not in self.user_connections:
                self.user_connections[user_id] = []
            self.user_connections[user_id].append(websocket)

        logger.info(f"WebSocket connected. Total connections: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket, user_id: int = None):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

        if user_id and user_id in self.user_connections:
            if websocket in self.user_connections[user_id]:
                self.user_connections[user_id].remove(websocket)
                if not self.user_connections[user_id]:
                    del self.user_connections[user_id]

        logger.info(f"WebSocket disconnected. Total connections: {len(self.active_connections)}")

    async def send_personal_message(self, message: str, websocket: WebSocket):
        try:
            await websocket.send_text(message)
        except Exception as e:
            logger.error(f"Error sending personal message: {e}")
            self.disconnect(websocket)

    async def send_user_message(self, message: Dict[str, Any], user_id: int):
        if user_id in self.user_connections:
            disconnected_connections = []
            for connection in self.user_connections[user_id]:
                try:
                    await connection.send_text(json.dumps(message))
                except Exception as e:
                    logger.error(f"Error sending user message: {e}")
                    disconnected_connections.append(connection)

            # Clean up disconnected connections
            for conn in disconnected_connections:
                self.disconnect(conn, user_id)

    async def broadcast(self, message: Dict[str, Any]):
        if not self.active_connections:
            return

        disconnected_connections = []
        message_str = json.dumps(message)

        for connection in self.active_connections:
            try:
                await connection.send_text(message_str)
            except Exception as e:
                logger.error(f"Error broadcasting message: {e}")
                disconnected_connections.append(connection)

        # Clean up disconnected connections
        for conn in disconnected_connections:
            self.disconnect(conn)

    async def send_price_update(self, product_id: int, new_price: float, old_price: float):
        """Send price update notification to all connected clients"""
        message = {
            "type": "price_update",
            "data": {
                "product_id": product_id,
                "new_price": new_price,
                "old_price": old_price,
                "change_percentage": ((new_price - old_price) / old_price) * 100 if old_price > 0 else 0
            }
        }
        await self.broadcast(message)

# Global WebSocket manager instance
ws_manager = WebSocketManager()
