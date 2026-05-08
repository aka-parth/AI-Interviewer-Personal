from pydantic import BaseModel
from typing import List

class EvaluationRequest(BaseModel):
    question:str
    answer:str

class EvaluationResponse(BaseModel):
    score: int
    feedback: str
    improvements: List[str]