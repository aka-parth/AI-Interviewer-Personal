export interface QuestionRequest {
  role: string;
  difficulty: string;
}

export interface QuestionResponse {
  question: string;
}