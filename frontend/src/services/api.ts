const API_BASE = "http://127.0.0.1:8000";

export async function fetchQuestion() {
  const response = await fetch(
    `${API_BASE}/question`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch question");
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