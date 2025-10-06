from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    """
    Main settings class to hold all application configuration.
    It reads environment variables from a .env file or the system environment.
    """
    # --- Project Metadata ---
    PROJECT_NAME: str = "Price Trackr API"

    # --- Database Configuration ---
    # The default values are designed to work with the docker-compose.yml setup.
    POSTGRES_USER: str = "user"
    POSTGRES_PASSWORD: str = "password"
    POSTGRES_SERVER: str = "db"
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str = "price_tracker_db"
    
    # --- Redis Configuration ---
    REDIS_HOST: str = "redis"
    REDIS_PORT: int = 6379
    REDIS_PASSWORD: str = "supersecretredispassword"
    
    # --- Authentication (JWT) ---
    SECRET_KEY: str = "a_very_secret_key_that_should_be_long_and_random"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30 # Token validity period

    @property
    def DATABASE_URL(self) -> str:
        """Construct the database URL from individual components."""
        return (
            f"postgresql+psycopg2://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@"
            f"{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    # Configure Pydantic to read from a .env file.
    # The path is relative to where the application is run from.
    # In our Docker setup, this will be the root of the /backend/ directory.
    model_config = SettingsConfigDict(env_file="../.env", env_file_encoding='utf-8', extra='ignore')


# Use lru_cache to create a singleton instance of the Settings class.
# This means the .env file is read only once, improving performance.
@lru_cache
def get_settings() -> Settings:
    return Settings()

# Create a single settings instance to be imported by other modules.
settings = get_settings()

