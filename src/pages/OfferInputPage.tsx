import { useNavigate } from "react-router-dom";
import { useState } from "react";

// import type { JobOfferInput } from "../types/job";
import { analyzeJobOffer } from "../services/api";

export default function OfferInputPage() {
  const [offerText, setOfferText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!offerText.trim()) {
      setError("Veuillez coller une offre d'emploi");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const analyzedOffer = await analyzeJobOffer(offerText);
      navigate("/interview", { state: analyzedOffer });
    } catch (err) {
      setError("Erreur lors de l'analyse. Veuillez réessayer.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
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

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing}
        className="mt-4 bg-black text-white px-6 py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition"
      >
        {isAnalyzing ? "Analyse en cours..." : "Analyser l'offre"}
      </button>
    </div>
  );
}
