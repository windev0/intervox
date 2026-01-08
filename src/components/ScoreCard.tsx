interface Props {
  label: string;
  score: number;
}

export default function ScoreCard({ label, score }: Props) {
  // Determine color based on score
  const getColorClass = () => {
    if (score >= 70) return "border-green-500 bg-green-50";
    if (score >= 50) return "border-yellow-500 bg-yellow-50";
    return "border-red-500 bg-red-50";
  };

  return (
    <div className={`border-2 p-4 rounded-md ${getColorClass()}`}>
      <p className="font-medium text-gray-700">{label}</p>
      <p className="text-3xl font-bold mt-2">{score} / 100</p>
      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${
            score >= 70 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
