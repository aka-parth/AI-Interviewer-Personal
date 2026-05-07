interface Props{
    score: number;
    feedback: string;
    improvements: string[];
}

const FeedbackCard = ({score,feedback,improvements}:Props) => {

  return (
    <div className="border rounded-xl px-5">
        <h1 className="text-xl font-medium mb-3">
            Ai Feedback
        </h1>
        <p className="mb-3">
            Score:{score}/10
        </p>
        <p>
            Feedback:{feedback}
        </p>
        <ul className="list-disc pl-5">
        {improvements.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default FeedbackCard
