from contextlib import asynccontextmanager
import os
import secrets

from fastapi import FastAPI, HTTPException, Depends, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from typing import List, Annotated

from sqlmodel import Session, select
from dotenv import load_dotenv
load_dotenv()
import cloudinary
import cloudinary.uploader
import cloudinary.api

from models import Thumbnail
from db import create_db_and_tables, create_base_projects, engine

limiter = Limiter(key_func=get_remote_address)
origins = [
    "http://localhost:5173", # Vite development server
    "https://jeremygordon.dev", # the domain I own
    "https://migmoog.github.io",
    os.getenv("ADMIN_ORIGIN")
]

ADMIN_API_KEY = os.getenv("ADMIN_KEY")
if not ADMIN_API_KEY:
    print("WARNING: No ADMIN_API_KEY is set. This means you can't use admin features")
def verify_admin_key(x_api_key: Annotated[str, Header()]) -> bool:
    if not ADMIN_API_KEY:
        raise HTTPException(status_code=503, detail="Admin functionality is off at the moment")
    
    if not x_api_key or not secrets.compare_digest(x_api_key, ADMIN_API_KEY):
        raise HTTPException(status_code=401, detail="Invalid API key")
    return True

@asynccontextmanager
async def lifespan(app: FastAPI):
    cloudinary.config(
        cloud_name="dsjq2z3vf",
        api_key=os.getenv("CLOUDINARY_API_KEY"),
        api_secret=os.getenv("CLOUDINARY_API_SECRET"),
        secure=True
    )
    create_db_and_tables()
    #create_base_projects()
    yield

app = FastAPI(lifespan=lifespan)
app.add_middleware(CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.get("/projects", response_model=List[Thumbnail])
async def get_projects() -> JSONResponse:
    with Session(engine) as session:
        project_thumbnails = session.exec(select(Thumbnail)).all()
        return project_thumbnails

@app.get("/projects/{thumbnail_id}", response_model=Thumbnail)
async def get_one_project(thumbnail_id: int) -> JSONResponse:
    with Session(engine) as session:
        thumbnail = session.get(Thumbnail, thumbnail_id)
        return thumbnail

@app.post("/admin/thumbnails", response_model=Thumbnail)
@limiter.limit("5/minute")
async def upload_thumbnail(
    request: Request,
    thumbnail: Thumbnail,
    _: bool = Depends(verify_admin_key)
):
    with Session(engine) as session:
        thumbnail.id = None
        session.add(thumbnail)
        session.commit()
        session.refresh(thumbnail)
        return thumbnail

@app.put("/admin/thumbnails/{thumbnail_id}", response_model=Thumbnail)
@limiter.limit("10/minute")
async def update_thumbnail(
    request: Request,
    thumbnail_id: int,
    thumbnail_data: Thumbnail,
    _: bool = Depends(verify_admin_key)
):
    with Session(engine) as session:
        # TODO
        thumbnail: Thumbnail  = session.get(Thumbnail, thumbnail_id)
        if not thumbnail:
            raise HTTPException(status_code=404, detail=f'Thumbnail({thumbnail_id}) not found')
        
        thumbnail.title = thumbnail_data.title
        thumbnail.link=  thumbnail_data.link
        thumbnail.info = thumbnail_data.info
        thumbnail.section = thumbnail_data.section
        if thumbnail_data.img_src:
            thumbnail.img_src = thumbnail_data.img_src
        session.add(thumbnail)
        session.commit()
        session.refresh(thumbnail)
        return thumbnail

@app.delete("/admin/thumbnails/{thumbnail_id}")
@limiter.limit("5/minute")
async def delete_thumbnail(
    request: Request,
    thumbnail_id: int,
    _: bool = Depends(verify_admin_key)
):
    with Session(engine) as session:
        thumbnail = session.get(Thumbnail, thumbnail_id)
        if not thumbnail:
            raise HTTPException(status_code=404, detail=f"There is no thumbnail with the id {thumbnail_id}")
        session.delete(thumbnail)
        session.commit()
        return {"message": "Thumbnail deleted"}