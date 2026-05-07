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
  async function handleSubmit(){
    try {
      const result = await submitAnswer(
        question,
        answer
      );

      setFeedback(result);
      setAnswer("");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='max-w-3xl mx-auto bg-blue-300 px-5 space-y-6'>
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
