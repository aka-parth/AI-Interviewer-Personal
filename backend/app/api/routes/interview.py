from fastapi import APIRouter

from app.api.controllers.interview_controller import (
    generate_question
)

router = APIRouter()

router.post(
    "/question"
)(
    generate_question
)