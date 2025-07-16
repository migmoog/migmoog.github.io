from sqlmodel import SQLModel, Field
from typing import Optional

class Thumbnail(SQLModel, table=True):
    __tablename__ = "thumbnails"
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    link: str
    img_src: str
    info: str
    section: int = Field(default=0)