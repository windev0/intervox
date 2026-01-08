import { useEffect, useRef } from "react";
import type { JobOfferInput } from "../types/job";
import { apiKey, assistantId } from "../config/vapi.config";
import VapiWidget from "./Vapi";
import vapiInstance from "../config/vapi.config";

interface Props {
  jobOffer: JobOfferInput;
  onTranscriptUpdate: (transcript: Array<{ role: string; text: string }>) => void;
  onEnd: () => void | Promise<void>;
}

export default function VoiceInterview({
  jobOffer,
  onTranscriptUpdate,
  onEnd,
}: Props) {
  const transcriptRef = useRef<Array<{ role: string; text: string }>>([]);

  // Écouter les événements message pour collecter le transcript et le partager avec le parent
  useEffect(() => {
    // Réinitialiser le transcript au début d'un nouvel appel
    const handleCallStart = () => {
      transcriptRef.current = [];
      onTranscriptUpdate([]);
      console.log("Call started - transcript reset"); // Debug
    };

    const handleMessage = (message: { type: string; role?: string; transcript?: string }) => {
      if (message.type === "transcript" && message.role && message.transcript) {
        const newEntry = {
          role: message.role,
          text: message.transcript,
        };
        transcriptRef.current = [...transcriptRef.current, newEntry];
        // Partager le transcript avec le parent
        onTranscriptUpdate([...transcriptRef.current]);
        console.log("New message added to transcript:", newEntry); // Debug
      }
    };

    vapiInstance.on("call-start", handleCallStart);
    vapiInstance.on("message", handleMessage);

    return () => {
      transcriptRef.current = [];
    };
  }, [onTranscriptUpdate]);

  return (
    <div className="border rounded-md p-6">
      <p className="mb-4">
        🎙️ L'entretien va bientôt démarrer... Réponds à voix haute.
      </p>
      <p className="mb-4 text-sm text-gray-600">
        L'assistant IA va te poser des questions sur : {jobOffer.detectedStack.join(", ")}
      </p>

      <VapiWidget
        apiKey={apiKey}
        assistantId={assistantId}
        jobOffer={jobOffer}
        onTranscriptUpdate={onTranscriptUpdate}
        onEnd={onEnd}
      />
    </div>
  );
}
