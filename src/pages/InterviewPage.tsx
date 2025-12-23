import { useLocation, useNavigate } from "react-router-dom";
import type { JobOfferInput } from "../types/job";
import VoiceInterview from "../components/VoiceInterview";

export const InterviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const jobOffer = location.state as JobOfferInput; // Récupère les données de l'offre d'emploi analysée

  const handleEndInterview = () => {
    navigate("/feedback");
  };

  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">
        Entretien technique – React
      </h2>

      <p className="mb-4 text-gray-600">
        Compétences détectées : {jobOffer.detectedStack.join(", ")}
      </p>

      <VoiceInterview onEnd={handleEndInterview} />
    </div>
  );
};
