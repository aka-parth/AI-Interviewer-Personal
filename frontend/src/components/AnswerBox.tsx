interface Props {
  answer: string;
  setAnswer: (value: string) => void;
}

export default function AnswerBox({
  answer,
  setAnswer,
}: Props) {
  return (
    <textarea
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
      placeholder="Type your answer..."
      className="border rounded-xl p-4 w-full min-h-45"
    />
  );
}