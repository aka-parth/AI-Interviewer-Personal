from app.schemas.interview_schema import (
    QuestionRequest,
    QuestionResponse
)

from app.services.question_service import (
    QuestionService
)

question_service = QuestionService()

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