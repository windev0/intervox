import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useCallback } from "react";
import type { JobOfferInput } from "../types/job";
import VoiceInterview from "../components/VoiceInterview";
import { generateFeedback } from "../services/api";
import vapiInstance from "../config/vapi.config";

export const InterviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const jobOffer = location.state as JobOfferInput; // Récupère les données de l'offre d'emploi analysée
  const transcriptRef = useRef<Array<{ role: string; text: string }>>([]); // Ref pour avoir toujours la dernière version
  const feedbackGeneratedRef = useRef(false); // Pour éviter de générer le feedback plusieurs fois
  const isMountedRef = useRef(true); // Pour vérifier si le composant est toujours monté

  const handleTranscriptUpdate = (newTranscript: Array<{ role: string; text: string }>) => {
    transcriptRef.current = newTranscript;
    console.log("Transcript updated in InterviewPage:", newTranscript.length, "messages"); // Debug
  };

  const handleEndInterview = useCallback(async () => {
    // Éviter de générer le feedback plusieurs fois
    if (feedbackGeneratedRef.current) {
      return;
    }
    feedbackGeneratedRef.current = true;

    // Utiliser le ref pour avoir la dernière version du transcript
    const currentTranscript = transcriptRef.current;
    const userMessages = currentTranscript.filter(msg => msg.role === "user");
    
    if (currentTranscript.length === 0) {
      alert("Aucune conversation enregistrée. L'entretien n'a pas pu être évalué.");
      feedbackGeneratedRef.current = false; // Réinitialiser pour permettre une nouvelle tentative
      return;
    }
    
    if (userMessages.length === 0) {
      alert("Vous n'avez pas encore répondu aux questions. Veuillez participer à l'entretien avant de voir le feedback.");
      feedbackGeneratedRef.current = false; // Réinitialiser pour permettre une nouvelle tentative
      return;
    }
    
    // Generate feedback from transcript
    try {
      const feedback = await generateFeedback(currentTranscript, jobOffer);
      navigate("/feedback", { state: feedback });
    } catch (error) {
      console.error("Error generating feedback:", error);
      alert("Erreur lors de la génération du feedback. Veuillez réessayer.");
      feedbackGeneratedRef.current = false; // Réinitialiser pour permettre une nouvelle tentative
    }
  }, [jobOffer, navigate]);

  // Écouter la fin de l'appel pour générer automatiquement le feedback
  useEffect(() => {
    isMountedRef.current = true;
    transcriptRef.current = []; // Réinitialiser le transcript au montage
    feedbackGeneratedRef.current = false; // Réinitialiser le flag

    // Réinitialiser le transcript au début d'un nouvel appel
    const handleCallStart = () => {
      transcriptRef.current = [];
      feedbackGeneratedRef.current = false;
      console.log("Call started - transcript and feedback flag reset"); // Debug
    };

    // Écouter la fin de l'appel pour générer automatiquement le feedback
    const handleCallEnd = () => {
      if (!isMountedRef.current) return;
      
      console.log("Call ended - current transcript length:", transcriptRef.current.length); // Debug
      console.log("Transcript content:", transcriptRef.current); // Debug
      
      // Attendre un peu pour s'assurer que tous les messages sont bien reçus
      setTimeout(() => {
        if (isMountedRef.current) {
          console.log("Calling handleEndInterview with transcript:", transcriptRef.current); // Debug
          handleEndInterview();
        }
      }, 1500); // Délai pour s'assurer que tous les messages sont reçus
    };

    // Ajouter les listeners
    vapiInstance.on("call-start", handleCallStart);
    vapiInstance.on("call-end", handleCallEnd);

    // Cleanup
    return () => {
      isMountedRef.current = false;
      feedbackGeneratedRef.current = false; // Réinitialiser quand on quitte la page
      transcriptRef.current = []; // Réinitialiser le transcript
    };
  }, [handleEndInterview]); // handleEndInterview dans les dépendances

  if (!jobOffer) {
    return (
      <div className="min-h-screen p-8 max-w-3xl mx-auto">
        <p className="text-red-600">Aucune offre d'emploi trouvée. Veuillez recommencer.</p>
        <button
          onClick={() => navigate("/offer-input")}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md"
        >
          Retour à l'analyse
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">
        Entretien technique – {jobOffer.detectedStack[0] || "Technique"}
      </h2>

      <p className="mb-4 text-gray-600">
        Compétences détectées : {jobOffer.detectedStack.join(", ")}
      </p>
      <p className="mb-4 text-sm text-gray-500">
        Niveau : {jobOffer.level === "intern" ? "Stage" : jobOffer.level === "junior" ? "Junior" : jobOffer.level === "mid" ? "Intermédiaire" : "Senior"}
      </p>

      <VoiceInterview
        jobOffer={jobOffer}
        onTranscriptUpdate={handleTranscriptUpdate}
        onEnd={handleEndInterview}
      />
    </div>
  );
};
