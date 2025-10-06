import asyncio
import json
import logging
from typing import Dict, Any, Optional
from dataclasses import dataclass
from enum import Enum
import redis
from ..runner import get_scraper_for_url

logger = logging.getLogger(__name__)

class TaskStatus(Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

@dataclass
class ScrapeTask:
    id: str
    product_id: int
    url: str
    platform: str
    status: TaskStatus = TaskStatus.PENDING
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    created_at: float = None
    processed_at: Optional[float] = None

class TaskQueue:
    def __init__(self, redis_url: str = "redis://localhost:6379"):
        self.redis_client = redis.from_url(redis_url)
        self.queue_name = "scrape_tasks"
        self.result_prefix = "task_result:"

    async def add_task(self, task: ScrapeTask) -> str:
        """Add a scrape task to the queue"""
        try:
            task_data = {
                'id': task.id,
                'product_id': task.product_id,
                'url': task.url,
                'platform': task.platform,
                'status': task.status.value,
                'created_at': task.created_at or asyncio.get_event_loop().time()
            }

            # Add to queue
            self.redis_client.lpush(self.queue_name, json.dumps(task_data))

            # Store task result placeholder
            self.redis_client.setex(
                f"{self.result_prefix}{task.id}",
                3600,  # 1 hour expiry
                json.dumps({
                    'status': task.status.value,
                    'created_at': task_data['created_at']
                })
            )

            logger.info(f"Added task {task.id} to queue")
            return task.id

        except Exception as e:
            logger.error(f"Error adding task to queue: {e}")
            raise

    async def get_task(self) -> Optional[ScrapeTask]:
        """Get the next task from the queue"""
        try:
            # Blocking pop from queue (with timeout)
            result = self.redis_client.brpop(self.queue_name, timeout=10)
            if not result:
                return None

            task_data = json.loads(result[1])

            task = ScrapeTask(
                id=task_data['id'],
                product_id=task_data['product_id'],
                url=task_data['url'],
                platform=task_data['platform'],
                status=TaskStatus(task_data['status']),
                created_at=task_data['created_at']
            )

            return task

        except Exception as e:
            logger.error(f"Error getting task from queue: {e}")
            return None

    async def update_task_status(self, task_id: str, status: TaskStatus, 
                               result: Optional[Dict[str, Any]] = None, 
                               error: Optional[str] = None):
        """Update task status and result"""
        try:
            task_result = {
                'status': status.value,
                'processed_at': asyncio.get_event_loop().time()
            }

            if result:
                task_result['result'] = result
            if error:
                task_result['error'] = error

            self.redis_client.setex(
                f"{self.result_prefix}{task_id}",
                3600,  # 1 hour expiry
                json.dumps(task_result)
            )

            logger.info(f"Updated task {task_id} status to {status.value}")

        except Exception as e:
            logger.error(f"Error updating task status: {e}")

    async def get_task_result(self, task_id: str) -> Optional[Dict[str, Any]]:
        """Get task result by ID"""
        try:
            result = self.redis_client.get(f"{self.result_prefix}{task_id}")
            if result:
                return json.loads(result)
            return None
        except Exception as e:
            logger.error(f"Error getting task result: {e}")
            return None

    async def process_tasks(self):
        """Background task processor"""
        logger.info("Starting task processor...")

        while True:
            try:
                task = await self.get_task()
                if not task:
                    continue

                logger.info(f"Processing task {task.id} for product {task.product_id}")

                # Update status to processing
                await self.update_task_status(task.id, TaskStatus.PROCESSING)

                try:
                    # Get appropriate scraper
                    scraper = get_scraper_for_url(task.url)
                    if not scraper:
                        raise Exception(f"No scraper available for URL: {task.url}")

                    # Scrape product
                    async with scraper:
                        result = await scraper.scrape_product(task.url)

                    # Update with success
                    await self.update_task_status(task.id, TaskStatus.COMPLETED, result=result)

                except Exception as e:
                    logger.error(f"Error processing task {task.id}: {e}")
                    await self.update_task_status(task.id, TaskStatus.FAILED, error=str(e))

            except Exception as e:
                logger.error(f"Error in task processor: {e}")
                await asyncio.sleep(5)  # Wait before retrying

# Global task queue instance
task_queue = TaskQueue()
