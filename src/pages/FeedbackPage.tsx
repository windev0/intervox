import { type InterviewFeedback } from "../types/feedback";
import ScoreCard from "../components/ScoreCard";

const mockFeedback: InterviewFeedback = {
  sessionId: "session-123",
  globalSummary:
    "Très bon entretien globalement avec une bonne maîtrise des concepts de React. Bonne communication et clarté dans les réponses.",
  strengths: [
    "Très bon entretien globalement avec une bonne maîtrise des concepts de React.",
    "Bonne communication et clarté dans les réponses.",
  ],
  weaknesses: [
    "Peut améliorer la gestion des performances dans les applications React.",
    "Doit approfondir les concepts avancés de TypeScript.",
  ],
  skillFeedback: [
    {
      skill: "React",
      level: "strong",
      comment: "Très bonne compréhension des hooks et du state management.",
    },
    {
      skill: "TypeScript",
      level: "average",
      comment:
        "Bonne utilisation des types de base, mais peut s'améliorer sur les types avancés.",
    },
  ],
  scores: {
    technical: 8,
    communication: 20,
    clarity: 15,
  },
  recommendations: [
    "Réviser useMemo et useCallback",
    "S'entraîner à expliquer à voix haute",
  ],
};

export default function FeedbackPage() {
  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Feedback de l’entretien</h2>

      <ScoreCard label="Technique" score={mockFeedback.scores.technical} />
      <ScoreCard
        label="Communication"
        score={mockFeedback.scores.communication}
      />
      <ScoreCard label="Clarté" score={mockFeedback.scores.clarity} />

      <section className="mt-6">
        <h3 className="font-semibold">Points forts</h3>
        <ul className="list-disc ml-6">
          {mockFeedback.strengths.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
