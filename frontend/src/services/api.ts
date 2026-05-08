import {
  QuestionResponse,
} from "../types/interview";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

export async function fetchQuestion(
  role: string,
  difficulty: string
): Promise<QuestionResponse> {

  const response = await fetch(
    `${API_BASE}/question`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        role,
        difficulty,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch question"
    );
  }

  return response.json();
}

export async function submitAnswer(
  question: string,
  answer: string
) {
  const response = await fetch(
    `${API_BASE}/evaluate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        answer,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to submit answer");
  }

  return response.json();
}