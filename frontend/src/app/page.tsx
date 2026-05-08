"use client"
import React, { useEffect, useState } from 'react'
import FeedbackCard from '../components/FeedbackCard';
import QuestionCard from '../components/QuestionCard';
import AnswerBox from '../components/AnswerBox';
import SubmitButton from '../components/SubmitButton';
import { fetchQuestion,submitAnswer } from '../services/api';
import RoleSelector from "../components/RoleSelector";
import DifficultySelector from "../components/DifficultySelector";
const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Frontend Developer");
  const [selectedDifficulty,setSelectedDifficulty] = useState("easy");
  const [question,setQuestion]=useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<any>(null);
  const [isEvaluating, setIsEvaluating]=useState(false);
  const [error, setError] = useState("");
  async function loadQuestion() {
  try {
    setIsLoading(true);
    const data =
      await fetchQuestion(
        selectedRole,
        selectedDifficulty
      );
    setQuestion(data.question);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
}
  async function handleSubmit() {
  try {
    setIsEvaluating(true);
    const result = await submitAnswer(
      question,
      answer
    );
    setFeedback(result);
  } catch (error) {
  setError(
    "Failed to evaluate answer"
  );
} finally {
    setIsEvaluating(false);
  }
}
  return (
    <div className='max-w-3xl mx-auto px-5 space-y-6'>
      <h1 className='text-3xl font-bold'>
        AI INTERVIEWER
      </h1>
      <RoleSelector selectedRole={selectedRole} setSelectedRole={setSelectedRole}/>
      <DifficultySelector selectedDifficulty={selectedDifficulty} setSelectedDifficulty={setSelectedDifficulty}/>
      <button onClick={loadQuestion} disabled={isLoading} className=" bg-black text-white px-5 py-3 rounded-xl">
  {
    isLoading
      ? "Generating..."
      : "Start Interview"
  }
</button>
      {question && (<QuestionCard question={question}/>)}
      <AnswerBox
        answer={answer}
        setAnswer={setAnswer}
      />
      <SubmitButton onClick={handleSubmit} />
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
          <FeedbackCard
          score={feedback.score}
          feedback={feedback.feedback}
          improvements={feedback.improvements}
        />
        )
      }
    </div>
  )
}

export default page
