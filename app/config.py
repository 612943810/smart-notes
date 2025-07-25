from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./smart_notes.db"
    DATABASE_CONNECT_ARGS: dict = {"check_same_thread": False}

settings = Settings()
