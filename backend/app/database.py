from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .config import settings

SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args=settings.DATABASE_CONNECT_ARGS
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
