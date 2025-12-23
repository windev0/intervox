import { useNavigate } from "react-router-dom";
import { useState } from "react";

import type { JobOfferInput } from "../types/job";

export default function OfferInputPage() {
  const [offerText, setOfferText] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    // MOCK analyse IA
    const analyzedOffer: JobOfferInput = {
      rawText: offerText,
      detectedStack: ["React", "TypeScript", "Node.js"],
      level: "mid",
    };

    navigate("/interview", { state: analyzedOffer });
  };

  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Prépare ton entretien technique
      </h1>

      <textarea
        className="w-full h-60 p-4 border rounded-md"
        placeholder="Colle ici l'offre d'emploi..."
        value={offerText}
        onChange={(e) => setOfferText(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        className="mt-4 bg-black text-white px-6 py-3 rounded-md"
      >
        Analyser l’offre
      </button>
    </div>
  );
}
