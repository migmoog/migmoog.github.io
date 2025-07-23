from sqlmodel import SQLModel, create_engine, Session, select
from dotenv import load_dotenv
from models import Thumbnail
import os

if not os.getenv("DATABASE_URL"):
    raise ValueError("DATABASE_URL environment variable is required for PostgreSQL")

engine = create_engine(os.getenv("DATABASE_URL"), echo=True)

def create_db_and_tables(_recreate = False):
    if os.getenv("ENV") == "dev":
        SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)