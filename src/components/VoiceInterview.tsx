import { apiKey, assistantId } from "../config/vapi.config";
import VapiWidget from "./Vapi";

interface Props {
  onEnd: () => void;
}

export default function VoiceInterview({ onEnd }: Props) {
  return (
    <div className="border rounded-md p-6">
      <p className="mb-4">
        🎙️ L'entretien va bientot démarrer... Réponds à voix haute.
      </p>

      {/* Plus tard : intégration Vapi ici */}
      {/* complete here by adding vapi component and providing inputs */}
      <VapiWidget apiKey={apiKey} assistantId={assistantId} onEnd={onEnd} />
    </div>
  );
}
