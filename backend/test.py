import asyncio

from app.services.openai_service import (
    OpenAIService
)

service = OpenAIService()

async def main():

    response = await service.generate_response(
        "Generate one easy React interview question."
    )

    print(response)

asyncio.run(main())