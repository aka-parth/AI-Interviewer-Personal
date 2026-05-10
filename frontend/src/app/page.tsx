"use client"
import React, { useEffect, useState } from 'react'
import FeedbackCard from '../components/FeedbackCard';
import QuestionCard from '../components/QuestionCard';
import AnswerBox from '../components/AnswerBox';
import SubmitButton from '../components/SubmitButton';
import { fetchQuestion,submitAnswer } from '../services/api';
import RoleSelector from "../components/RoleSelector";
import DifficultySelector from "../components/DifficultySelector";
import InterviewSummary from "../components/InterviewSummary";
import InterviewTranscript from "../components/InterviewTranscript";
import InterviewAnalytics from "../components/InterviewAnalytics";
const page = () => {
  interface InterviewRound {

  question: string;

  answer: string;

  score: number;

  feedback: string;

  improvements: string[];
}
interface InterviewQuestion {

  type:
    | "technical"
    | "coding"
    | "behavioral";

  content: string;
}
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Frontend Developer");
  const [selectedDifficulty,setSelectedDifficulty] = useState("easy");
  const [question,setQuestion]=useState<InterviewQuestion| null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<any>(null);
  const [isEvaluating, setIsEvaluating]=useState(false);
  const [error, setError] = useState("");
  const TOTAL_QUESTIONS = 2;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [interviewRounds, setInterviewRounds] = useState<InterviewRound[]>([]);
  const QUESTION_TIME = 60;
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const difficultyLevels = ["easy","medium","hard"];
  const [interviewStatus, setInterviewStatus] = useState< | "idle" | "loading-question" | "answering" | "evaluating" | "completed">("idle");
  useEffect(() => {

  if (
    !question ||
    feedback ||
    interviewCompleted
  ) {
    return;
  }

  const timer = setInterval(() => {

    setTimeLeft(prev => {

      if (prev <= 1) {

        clearInterval(timer);

        handleSubmit();

        return 0;
      }

      return prev - 1;
    });

  }, 1000);

  return () => clearInterval(timer);

}, [
  question,
  feedback,
  interviewCompleted
]);
  async function loadQuestion() {
  try {
    setInterviewStatus(
      "loading-question"
    );    
      const data =
      await fetchQuestion(
        selectedRole,
        selectedDifficulty
      );
    setQuestion({
  type: "technical",
  content: data.question
});
    setInterviewStatus(
      "answering"
    );
    setTimeLeft(QUESTION_TIME);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
}
  async function handleSubmit() {
  try {
    if (interviewStatus === "evaluating"){return;}
    setInterviewStatus("evaluating");   
    const result = await submitAnswer(
      question?.content || "",
      answer
    );
    setFeedback(result);
    adjustDifficulty(result.score);
    setInterviewRounds(prev => [
  ...prev,
    {
      question:question?.content || "",
      answer,
      score: result.score,
      feedback: result.feedback,
      improvements: result.improvements
    }
    ]);
  } catch (error) {
  setError(
    "Failed to evaluate answer"
  );
} finally {
    if (!interviewCompleted) {

  setInterviewStatus(
    "answering"
    );
  }
  }
}
function adjustDifficulty(
  score: number
) {

  const currentIndex =
    difficultyLevels.indexOf(
      selectedDifficulty
    );

  if (
    score >= 8 &&
    currentIndex < difficultyLevels.length - 1
  ) {

    setSelectedDifficulty(
      difficultyLevels[currentIndex + 1]
    );
  }

  else if (
    score <= 5 &&
    currentIndex > 0
  ) {

    setSelectedDifficulty(
      difficultyLevels[currentIndex - 1]
    );
  }
}
function handleNextQuestion() {

  if (
    currentQuestionIndex >= TOTAL_QUESTIONS
  ) {

    setInterviewCompleted(true);
    setInterviewStatus(
      "completed"
    );

    return;
  }

  setCurrentQuestionIndex(
    prev => prev + 1
  );

  setFeedback(null);
  setAnswer("");
  setTimeLeft(QUESTION_TIME);
  loadQuestion();
}
function resetInterview() {

  setQuestion(null);

  setAnswer("");

  setFeedback(null);

  setError("");

  setCurrentQuestionIndex(1);

  setInterviewCompleted(false);

  setInterviewRounds([]);

  setTimeLeft(QUESTION_TIME);

  setInterviewStatus("idle");

  setSelectedDifficulty("easy");
}
  const averageScore =
  interviewRounds.length > 0
    ? (
        interviewRounds.reduce(
          (total, item) =>
            total + item.score,
          0
        ) / interviewRounds.length).toFixed(1): 0;
  return (
    <div className='max-w-3xl mx-auto px-5 space-y-6'>
      <h1 className='text-3xl font-bold'>
        AI INTERVIEWER
      </h1>
        {
          interviewCompleted && (
          <>
          <InterviewSummary
            averageScore={averageScore}
            totalQuestions={TOTAL_QUESTIONS}
            selectedRole={selectedRole}
            selectedDifficulty={selectedDifficulty}
          />
          <InterviewTranscript
            interviewRounds={interviewRounds}
          />
          <InterviewAnalytics
            interviewRounds={interviewRounds}
          />
          <button onClick={resetInterview}
          className="bg-black text-white px-5 py-3 rounded-xl">
          Start New Interview
          </button>
          </>
        )
      }
      {
        !interviewCompleted && (
          <>
          <RoleSelector selectedRole={selectedRole} setSelectedRole={setSelectedRole}/>
          <DifficultySelector selectedDifficulty={selectedDifficulty} setSelectedDifficulty={setSelectedDifficulty}/>
          <button onClick={loadQuestion} disabled={isLoading} className=" bg-black text-white px-5 py-3 rounded-xl">
        {
          isLoading
          ? "Generating..."
          : "Start Interview"
        }
        </button>
          <p className="text-lg font-semibold">
            Question {currentQuestionIndex}/{TOTAL_QUESTIONS}
          </p>
          {question && !feedback && (<p className="text-red-500 font-semibold">Time Left: {timeLeft}s</p>)}
          {question && (<p className="text-sm text-blue-500 font-medium uppercase">{question.type} Question</p>)}
          {question && (<QuestionCard question={question?.content || ""}/>)}
          {question && (<AnswerBox answer={answer}setAnswer={setAnswer}/>)}
          {question && (<SubmitButton onClick={handleSubmit} disabled={interviewStatus=== "evaluating"}/>)}
          {/* conditional rendering  */}
          {/* only shows feedback when feedback is not null */}
          {
            isEvaluating && (
            <p className="text-blue-500 font-medium">
              Evaluating answer...
            </p>
          )
        }
      {
        error && (
          <p className="text-red-500">
            {error}
          </p>
        )
      }
      {
        feedback&&(
          <>
          <FeedbackCard
          score={feedback.score}
          feedback={feedback.feedback}
          improvements={feedback.improvements}

        />
          {
          !interviewCompleted && (
            <button
              onClick={handleNextQuestion}
              className="bg-black text-white px-4 py-2 rounded">
              Next Question
            </button>
            )
          }
        </>
        )
      }
          </>
        )
      }
    </div>
  )
}

export default page
