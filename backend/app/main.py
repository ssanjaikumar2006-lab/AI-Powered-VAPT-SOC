from fastapi import FastAPI

app = FastAPI(
    title="AI-Powered VAPT & SOC Platform",
    version="1.0.0",
    description="Backend API for AI-Powered VAPT & SOC Platform"
)


@app.get("/")
def root():
    return {
        "message": "AI-Powered VAPT & SOC Backend is running"
    }