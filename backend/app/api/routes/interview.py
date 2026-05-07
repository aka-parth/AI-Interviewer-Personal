from fastapi import APIRouter

from app.schemas.interview_schema import (
    QuestionRequest,
    QuestionResponse
)

from app.services.question_service import (
    QuestionService
)

router = APIRouter()

question_service = QuestionService()

@router.post(
    "/question",
    response_model=QuestionResponse
)
async def generate_question(
    request: QuestionRequest
):

    question = await question_service.generate_question(
        request.role,
        request.difficulty
    )

    return {
        "question": question
    }