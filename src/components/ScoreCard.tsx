interface Props {
  label: string;
  score: number;
}

export default function ScoreCard({ label, score }: Props) {
  return (
    <div className="border p-4 rounded-md mb-2">
      <p className="font-medium">{label}</p>
      <p className="text-xl">{score} / 10</p>
    </div>
  );
}
