from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    LLM_API_KEY = os.getenv("LLM_API_KEY")
    MODEL_NAME = os.getenv("MODEL_NAME")

settings = Settings()