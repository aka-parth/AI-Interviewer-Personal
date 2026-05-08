from app.schemas.evaluation_schema import (
    EvaluationRequest
)

from app.services.evaluation_service import (
    EvaluationService
)

evaluation_service = EvaluationService()


async def evaluate_answer(
    request: EvaluationRequest
):

    result = await evaluation_service.evaluate_answer(
        request.question,
        request.answer
    )

    return result