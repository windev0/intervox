import { useLocation, useNavigate } from "react-router-dom";
import { type InterviewFeedback } from "../types/feedback";
import ScoreCard from "../components/ScoreCard";

const defaultFeedback: InterviewFeedback = {
  sessionId: "session-default",
  globalSummary: "Aucun feedback disponible pour cette session.",
  strengths: [],
  weaknesses: [],
  skillFeedback: [],
  scores: {
    technical: 0,
    communication: 0,
    clarity: 0,
  },
  recommendations: [],
};

export default function FeedbackPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const feedback = (location.state as InterviewFeedback) || defaultFeedback;

  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Feedback de l'entretien</h2>

      {/* Summary */}
      <section className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-gray-700">{feedback.globalSummary}</p>
      </section>

      {/* Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ScoreCard label="Technique" score={feedback.scores.technical} />
        <ScoreCard
          label="Communication"
          score={feedback.scores.communication}
        />
        <ScoreCard label="Clarté" score={feedback.scores.clarity} />
      </div>

      {/* Strengths */}
      {feedback.strengths.length > 0 && (
        <section className="mt-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 text-green-700">
            ✅ Points forts
          </h3>
          <ul className="list-disc ml-6 space-y-2">
            {feedback.strengths.map((s, index) => (
              <li key={index} className="text-gray-700">
                {s}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Weaknesses */}
      {feedback.weaknesses.length > 0 && (
        <section className="mt-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 text-orange-700">
            ⚠️ Axes d'amélioration
          </h3>
          <ul className="list-disc ml-6 space-y-2">
            {feedback.weaknesses.map((w, index) => (
              <li key={index} className="text-gray-700">
                {w}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skill Feedback */}
      {feedback.skillFeedback.length > 0 && (
        <section className="mt-6 mb-6">
          <h3 className="text-xl font-semibold mb-3">📊 Feedback par compétence</h3>
          <div className="space-y-4">
            {feedback.skillFeedback.map((skill, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{skill.skill}</h4>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      skill.level === "strong"
                        ? "bg-green-100 text-green-800"
                        : skill.level === "average"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {skill.level === "strong"
                      ? "Fort"
                      : skill.level === "average"
                      ? "Moyen"
                      : "Faible"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{skill.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommendations */}
      {feedback.recommendations.length > 0 && (
        <section className="mt-6 mb-6">
          <h3 className="text-xl font-semibold mb-3">💡 Recommandations</h3>
          <ul className="list-disc ml-6 space-y-2">
            {feedback.recommendations.map((r, index) => (
              <li key={index} className="text-gray-700">
                {r}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate("/offer-input")}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Nouvel entretien
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}
