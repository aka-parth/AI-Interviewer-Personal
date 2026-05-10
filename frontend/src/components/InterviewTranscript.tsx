import React from "react";

interface InterviewRound {

  question: string;

  answer: string;

  score: number;

  feedback: string;

  improvements: string[];
}

interface InterviewTranscriptProps {

  interviewRounds: InterviewRound[];
}

const InterviewTranscript = ({
  interviewRounds
}: InterviewTranscriptProps) => {

  return (

    <div className="space-y-6">

      <h2 className="text-2xl font-bold">
        Interview Transcript
      </h2>

      {
        interviewRounds.map(
          (round, index) => (

            <div
              key={index}
              className="border p-4 rounded-xl space-y-3"
            >

              <p>
                <span className="font-semibold">
                  Question {index + 1}:
                </span>

                {" "}
                {round.question}
              </p>

              <p>
                <span className="font-semibold">
                  Your Answer:
                </span>

                {" "}
                {round.answer}
              </p>

              <p>
                <span className="font-semibold">
                  Score:
                </span>

                {" "}
                {round.score}/10
              </p>

              <p>
                <span className="font-semibold">
                  Feedback:
                </span>

                {" "}
                {round.feedback}
              </p>

              <div>

                <p className="font-semibold">
                  Improvements:
                </p>

                <ul className="list-disc ml-6">

                  {
                    round.improvements.map(
                      (
                        improvement,
                        improvementIndex
                      ) => (

                        <li
                          key={improvementIndex}
                        >
                          {improvement}
                        </li>
                      )
                    )
                  }

                </ul>

              </div>

            </div>
          )
        )
      }

    </div>
  );
};

export default InterviewTranscript;