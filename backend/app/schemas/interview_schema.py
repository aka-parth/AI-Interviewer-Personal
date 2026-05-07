from pydantic import BaseModel

class QuestionRequest(BaseModel):
    role: str
    difficulty: str

class QuestionResponse(BaseModel):
    question: str