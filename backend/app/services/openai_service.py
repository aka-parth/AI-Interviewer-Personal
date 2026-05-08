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
        user_prompt: str
    ):

        response = await client.chat.completions.create(
            model=settings.MODEL_NAME,
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",#roles can be system,user assistant
                    "content": user_prompt
                }
            ],
            temperature=0.7,
            response_format={
                "type": "json_object"
            }
        )

        return response.choices[0].message.content # it will return actual ai response
    