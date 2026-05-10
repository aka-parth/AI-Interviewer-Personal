import React from "react";

interface InterviewSummaryProps {

  averageScore: string | number;

  totalQuestions: number;

  selectedRole: string;

  selectedDifficulty: string;
}


const InterviewSummary = ({
  averageScore,
  totalQuestions,
  selectedRole,
  selectedDifficulty
}: InterviewSummaryProps) => {

  return (

    <div className="bg-gray-100 p-6 rounded-xl space-y-4">

      <h2 className="text-2xl font-bold">
        Interview Completed
      </h2>

      <p>
        Total Questions:
        {totalQuestions}
      </p>

      <p>
        Average Score:
        {averageScore}/10
      </p>

      <p>
        Role:
        {selectedRole}
      </p>

      <p>
        Difficulty:
        {selectedDifficulty}
      </p>

    </div>
  );
};

export default InterviewSummary;