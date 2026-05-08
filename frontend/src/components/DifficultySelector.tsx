interface Props {
  selectedDifficulty: string;
  setSelectedDifficulty: (
    difficulty: string
  ) => void;
}

const difficulties = [
  "easy",
  "medium",
  "hard",
];

export default function DifficultySelector({
  selectedDifficulty,
  setSelectedDifficulty,
}: Props) {

  return (
    <div className="space-y-3">

      <h2 className="text-xl font-bold">
        Select Difficulty
      </h2>

      <div className="flex gap-3">

        {difficulties.map(
          (difficulty) => (

          <button
            key={difficulty}
            onClick={() =>
              setSelectedDifficulty(
                difficulty
              )
            }
            className={`
              border
              rounded-xl
              px-4
              py-2

              ${
                selectedDifficulty ===
                difficulty
                  ? "bg-black text-white"
                  : ""
              }
            `}
          >
            {difficulty}
          </button>

        ))}

      </div>

    </div>
  );
}