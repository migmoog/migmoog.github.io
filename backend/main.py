from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import sqlite3

origins = [
    "http://localhost:5173", # Vite development server
    "https://jeremygordon.dev", # the domain I own
]

app = FastAPI()
app.add_middleware(CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILENAME = "db.sqlite3"

@app.get("/projects")
async def get_projects() -> JSONResponse:
    conn = sqlite3.connect(DB_FILENAME)
    project_jsons = []
    for row in conn.execute(
        "SELECT title, link, img_source, info, section FROM thumbnails"
    ).fetchall():
        row = {
            "title": row[0],
            "link": row[1],
            "img_src": row[2],
            "info": row[3],
            "section": row[4],
        }
        project_jsons.append(row)
    
    conn.close()
    return JSONResponse(content=project_jsons) 

if __name__ == "__main__":
    # create sqlite3 database if it doesn't exist and initialize it with init.sql
    import sqlite3
    conn = sqlite3.connect(DB_FILENAME)
    cursor = conn.cursor()
    # Check if the 'thumbnails' table exists
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='thumbnails';")
    exists = cursor.fetchone()
    if not exists:
        with open("init.sql", "r") as f:
            conn.executescript(f.read())
    conn.close()
    # Start the FastAPI server
    import sys
    if "uvicorn" not in sys.modules:
        import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=os.getenv("PORT", 5174))