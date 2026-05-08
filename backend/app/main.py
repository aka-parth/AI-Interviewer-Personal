from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.interview import router as interview_router
from app.api.routes.evaluate import router as evaluate_router
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(interview_router)
app.include_router(evaluate_router)
@app.get("/")
async def root():
    return {
        "message": "AI Interviewer Backend Running"
    }