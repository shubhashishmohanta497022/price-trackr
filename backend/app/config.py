import os
from pydantic import BaseModel

class Settings(BaseModel):
    APP_ENV: str = os.getenv("APP_ENV", "production")
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://redis:6379/0")
    ALLOWED_ORIGINS: list[str] = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
    VAPID_PUBLIC_KEY: str = os.getenv("VAPID_PUBLIC_KEY", "")
    VAPID_PRIVATE_KEY: str = os.getenv("VAPID_PRIVATE_KEY", "")
    VAPID_EMAIL: str = os.getenv("VAPID_EMAIL", "mailto:admin@example.com")

settings = Settings()
