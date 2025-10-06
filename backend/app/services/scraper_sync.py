import httpx
import asyncio
from typing import Dict, Any
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class ScraperSync:
    def __init__(self):
        self.worker_base_url = "http://worker:8080"  # Docker service name

    async def trigger_scrape(self, product_id: int, url: str, platform: str) -> Dict[str, Any]:
        """Trigger a scrape job for a specific product"""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{self.worker_base_url}/scrape",
                    json={
                        "product_id": product_id,
                        "url": url,
                        "platform": platform
                    },
                    timeout=30.0
                )
                response.raise_for_status()
                return response.json()
            except httpx.RequestError as e:
                logger.error(f"Error communicating with scraper: {e}")
                return {"error": str(e)}

    async def get_scrape_status(self, job_id: str) -> Dict[str, Any]:
        """Get the status of a scrape job"""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{self.worker_base_url}/status/{job_id}",
                    timeout=10.0
                )
                response.raise_for_status()
                return response.json()
            except httpx.RequestError as e:
                logger.error(f"Error getting scrape status: {e}")
                return {"error": str(e)}

scraper_sync = ScraperSync()
