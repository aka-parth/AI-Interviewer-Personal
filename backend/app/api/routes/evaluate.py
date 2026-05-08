from fastapi import APIRouter

from app.api.controllers.evaluation_controller import (
    evaluate_answer
)

router = APIRouter()

router.post(
    "/evaluate"
)(
    evaluate_answer
)