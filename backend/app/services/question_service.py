from app.prompts.question_prompts import (
    generate_question_prompt
)

from app.services.openai_service import (
    OpenAIService
)

openai_service = OpenAIService()

class QuestionService:

    async def generate_question(
        self,
        role: str,
        difficulty: str
    ):

        prompt = generate_question_prompt(
            role,
            difficulty
        )

        question = await openai_service.generate_response(
            system_prompt="You are an expert technical interviewer who asks concise and realistic interview questions.",
            user_prompt=prompt
        )   

        return question