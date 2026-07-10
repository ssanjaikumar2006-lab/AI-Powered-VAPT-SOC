from fastapi import FastAPI
from sqlalchemy import text

#from app.db.database import engine
from app.db.database import Base, engine
from app.db import base

Base.metadata.create_all(bind=engine)
app = FastAPI(
    title="AI-Powered VAPT & SOC Platform",
    version="1.0.0",
    description="Backend API"
)


@app.get("/")
def root():
    return {
        "message": "AI-Powered VAPT & SOC Backend is running"
    }


@app.get("/health")
def health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {
            "status": "Database Connected Successfully"
        }

    except Exception as e:
        return {
            "status": "Database Connection Failed",
            "error": str(e)
        }