interface Props {
  question: string;
}

export default function QuestionCard({
  question,
}: Props) {
  return (
    <div className="border rounded-xl p-5">
      <h2 className="text-xl font-bold mb-3">
        Interview Question
      </h2>

      <p>{question}</p>
    </div>
  );
}