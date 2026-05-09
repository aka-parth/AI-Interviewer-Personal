import json

from app.services.openai_service import (
    OpenAIService
)

from app.prompts.evaluation_prompts import EVALUATION_SYSTEM_PROMPT


openai_service = OpenAIService()


class EvaluationService:

    async def evaluate_answer(
        self,
        question: str,
        answer: str
    ):
        try:
            user_prompt = f"""
            Question:
            {question}

            Candidate Answer:
            {answer}
            """

            response = await openai_service.generate_response(
                system_prompt=EVALUATION_SYSTEM_PROMPT,
                user_prompt=user_prompt,
                json_mode=True
            )
            cleaned_response = (
                response
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )
            print(cleaned_response)
            parsed_response = json.loads(
                cleaned_response
            )

            return parsed_response
        except Exception as e:

            return {
                "score": 0,
                "feedback": "Evaluation failed",
                "improvements": [
                    str(e)
                ]
            }