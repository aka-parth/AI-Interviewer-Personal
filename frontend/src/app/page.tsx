"use client"
import React, { useEffect, useState } from 'react'
import FeedbackCard from '../components/FeedbackCard';
import QuestionCard from '../components/QuestionCard';
import AnswerBox from '../components/AnswerBox';
import SubmitButton from '../components/SubmitButton';
import { fetchQuestion,submitAnswer } from '../services/api';

const page = () => {
  const [question,setQuestion]=useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<any>(null);
  const [isEvaluating, setIsEvaluating]=useState(false);
  const [error, setError] = useState("");
  useEffect(()=>{
    loadQuestion();
  },[]);
  async function loadQuestion(){
    try {
      const data = await fetchQuestion();
      setQuestion(data.question);
    } catch (error) {
      console.error(error);
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
      <QuestionCard question={question}/>
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
