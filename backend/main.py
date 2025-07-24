from contextlib import asynccontextmanager
import os
import secrets

from fastapi import FastAPI, HTTPException, Depends, Header, Request, Form, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from typing import List, Annotated, Optional

from sqlmodel import Session, select
from dotenv import load_dotenv

ENV_TYPE = os.getenv("ENV")
if ENV_TYPE == "dev":
    load_dotenv('.env.local')
elif os.path.exists(".env"):
    load_dotenv()
else:
    print(f"Trying some environment junk: {os.getenv("ADMIN_ORIGIN")}")

import cloudinary
from cloudinary import CloudinaryImage
import cloudinary.uploader
import cloudinary.api

from models import Thumbnail
from db import create_db_and_tables, engine

limiter = Limiter(key_func=get_remote_address)
origins = [
    "http://localhost:5173", # Vite development server
    "https://jeremygordon.dev", # the domain I own
    "https://migmoog.github.io",
    os.getenv("ADMIN_ORIGIN")
]

ADMIN_API_KEY = os.getenv("ADMIN_API_KEY")
if not ADMIN_API_KEY:
    print("WARNING: No ADMIN_API_KEY is set. This means you can't use admin features")
def verify_admin_key(x_api_key: Annotated[str, Header()]) -> bool:
    if not ADMIN_API_KEY:
        raise HTTPException(status_code=503, detail="Admin functionality is off at the moment")
    
    if not x_api_key or not secrets.compare_digest(x_api_key, ADMIN_API_KEY):
        raise HTTPException(status_code=401, detail="Invalid API key")
    return True

def find_thumbnail(thumbnail_id: int) -> Thumbnail:
    with Session(engine) as session:
        thumbnail = session.get(Thumbnail, thumbnail_id)
        if not thumbnail:
            raise HTTPException(
                status_code=404,
                detail=f"Thumbnail with ID {thumbnail_id} not found."
            )
        return thumbnail

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
async def get_one_project(thumbnail: Annotated[Thumbnail, Depends(find_thumbnail)]) -> JSONResponse:
    return thumbnail

def upload_to_cdn(file: bytes) -> CloudinaryImage:
    return cloudinary.uploader.upload_image(file, asset_folder='game_thumbnails')

@app.post("/admin/thumbnails", response_model=Thumbnail)
@limiter.limit("5/minute")
async def upload_thumbnail(
    request: Request,
    title: Annotated[str, Form()],
    link: Annotated[str, Form()],
    info: Annotated[str, Form()],
    thumb_image: Annotated[UploadFile, File()],
    section: Annotated[int, Form()],
    _: bool = Depends(verify_admin_key)
):
    try:
        contents = await thumb_image.read()
        img_upload_result = upload_to_cdn(contents)
        img_src = img_upload_result.url

        with Session(engine) as session:
            new_thumbnail = Thumbnail(
                id=None,
                title=title,
                link=link,
                info=info,
                img_src=img_src,
                section=section,
                public_id=img_upload_result.public_id
            )
            session.add(new_thumbnail)
            session.commit()
            return new_thumbnail
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Couldn't upload image file: {e}")

@app.put("/admin/thumbnails/{thumbnail_id}", response_model=Thumbnail)
@limiter.limit("10/minute")
async def update_thumbnail(
    request: Request,
    thumbnail: Annotated[Thumbnail, Depends(find_thumbnail)],
    # id: Annotated[int, Form()],
    title: Annotated[str, Form()],
    link: Annotated[str, Form()],
    info: Annotated[str, Form()],
    thumb_image: Annotated[Optional[UploadFile], File()],
    section: Annotated[int, Form()],
    _: bool = Depends(verify_admin_key)
):
    if thumb_image:
        try:
            contents = await thumb_image.read()
            upload_result = upload_to_cdn(contents)
            thumbnail.public_id = upload_result.public_id
            thumbnail.img_src = upload_result.url
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Couldn't update image file: {e}")
    
    thumbnail.title = title
    thumbnail.link = link
    thumbnail.info = info
    thumbnail.section = section

    with Session(engine) as session:
        session.add(thumbnail)
        session.commit()
        return thumbnail


@app.delete("/admin/thumbnails/{thumbnail_id}", response_description="Thumbnail was deleted.")
@limiter.limit("5/minute")
async def delete_thumbnail(
    request: Request,
    thumbnail: Annotated[Thumbnail, Depends(find_thumbnail)],
    _: bool = Depends(verify_admin_key)
):
    cloudinary.uploader.destroy(thumbnail.public_id)
    with Session(engine) as session:
        session.delete(thumbnail)
        session.commit()
        return {"message": "Thumbnail deleted"}