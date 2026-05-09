from openai import AsyncOpenAI
from app.core.config import settings

client = AsyncOpenAI(
    api_key=settings.LLM_API_KEY,
    base_url="https://api.groq.com/openai/v1"
)

class OpenAIService:

    async def generate_response(
        self,
        system_prompt: str,
        user_prompt: str,
        json_mode:bool=False
    ):

        params = {
            "model": settings.MODEL_NAME,
            "messages": [
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": user_prompt
                }
            ],
            "temperature": 0.7
        }

        if json_mode:

            params["response_format"] = {
                "type": "json_object"
            }

        response = await client.chat.completions.create(
            **params
        )

        return response.choices[0].message.content # it will return actual ai response
    