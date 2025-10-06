import asyncio
import logging
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
import uvicorn
from scrapers.amazon import AmazonScraper
from scrapers.flipkart import FlipkartScraper
from scrapers.myntra import MyntraScraper
from scrapers.croma import CromaScraper
from scrapers.ajio import AjioScraper

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Price Trackr Scraper Service", version="1.0.0")

# Initialize scrapers
SCRAPERS = [
    AmazonScraper(),
    FlipkartScraper(),
    MyntraScraper(),
    CromaScraper(),
    AjioScraper(),
]

class ScrapeRequest(BaseModel):
    product_id: int
    url: str
    platform: str

class ScrapeResponse(BaseModel):
    success: bool
    data: Dict[str, Any] = None
    error: str = None

def get_scraper_for_url(url: str):
    """Find the appropriate scraper for the given URL"""
    for scraper in SCRAPERS:
        if scraper.can_scrape(url):
            return scraper
    return None

@app.get("/")
async def root():
    return {"message": "Price Trackr Scraper Service", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "scrapers": len(SCRAPERS)}

@app.post("/scrape", response_model=ScrapeResponse)
async def scrape_product(request: ScrapeRequest):
    """Scrape product information from the given URL"""
    try:
        logger.info(f"Scraping product {request.product_id} from {request.url}")

        scraper = get_scraper_for_url(request.url)
        if not scraper:
            raise HTTPException(
                status_code=400, 
                detail=f"No scraper available for URL: {request.url}"
            )

        async with scraper:
            product_data = await scraper.scrape_product(request.url)

        logger.info(f"Successfully scraped product {request.product_id}")
        return ScrapeResponse(success=True, data=product_data)

    except Exception as e:
        logger.error(f"Error scraping product {request.product_id}: {e}")
        return ScrapeResponse(success=False, error=str(e))

@app.get("/supported-platforms")
async def get_supported_platforms():
    """Get list of supported platforms"""
    platforms = []
    for scraper in SCRAPERS:
        platforms.append({
            "name": scraper.__class__.__name__.replace("Scraper", ""),
            "domains": getattr(scraper, 'domains', [])
        })
    return {"platforms": platforms}

if __name__ == "__main__":
    uvicorn.run(
        "runner:app",
        host="0.0.0.0",
        port=8080,
        reload=False,
        log_level="info"
    )
