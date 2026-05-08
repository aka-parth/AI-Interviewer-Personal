interface Props {
  score: number;
  feedback: string;
  improvements: string[];
}

export default function FeedbackCard({
  score,
  feedback,
  improvements,
}: Props) {
  return (
    <div className="border rounded-2xl p-6 text-black shadow-md bg-white">

      <h2 className="text-2xl font-bold mb-5">
        AI Evaluation
      </h2>

      <div className="mb-4">
        <p className="text-lg font-semibold">
          Score
        </p>

        <div className="text-4xl font-bold">
          {score}/10
        </div>
      </div>

      <div className="mb-5">
        <p className="text-lg font-semibold mb-2">
          Feedback
        </p>

        <p>{feedback}</p>
      </div>

      <div>
        <p className="text-lg font-semibold mb-2">
          Improvements
        </p>

        <ul className="list-disc pl-5 space-y-2">
          {improvements.map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}