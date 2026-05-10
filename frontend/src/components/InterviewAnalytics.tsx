import React from "react";

interface InterviewRound {

  question: string;

  answer: string;

  score: number;

  feedback: string;

  improvements: string[];
}

interface InterviewAnalyticsProps {

  interviewRounds: InterviewRound[];
}

const InterviewAnalytics = ({
  interviewRounds
}: InterviewAnalyticsProps) => {

  const strongRounds =
    interviewRounds.filter(
      round => round.score >= 8
    );

  const weakRounds =
    interviewRounds.filter(
      round => round.score <= 5
    );

  return (

    <div className="space-y-6">

      <h2 className="text-2xl font-bold">
        Performance Analytics
      </h2>

      <div className="space-y-4">

        <div>

          <h3 className="text-xl font-semibold">
            Strong Areas
          </h3>

          <ul className="list-disc ml-6">

            {
              strongRounds.length > 0
              ? (
                  strongRounds.map(
                    (
                      round,
                      index
                    ) => (

                      <li key={index}>
                        {round.question}
                      </li>
                    )
                  )
                )
              : (
                  <p>
                    No strong areas detected yet.
                  </p>
                )
            }

          </ul>

        </div>

        <div>

          <h3 className="text-xl font-semibold">
            Areas to Improve
          </h3>

          <ul className="list-disc ml-6">

            {
              weakRounds.length > 0
              ? (
                  weakRounds.map(
                    (
                      round,
                      index
                    ) => (

                      <li key={index}>
                        {round.question}
                      </li>
                    )
                  )
                )
              : (
                  <p>
                    No major weak areas detected.
                  </p>
                )
            }

          </ul>

        </div>

      </div>

    </div>
  );
};

export default InterviewAnalytics;