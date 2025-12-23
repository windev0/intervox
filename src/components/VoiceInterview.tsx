interface Props {
  onEnd: () => void;
}

export default function VoiceInterview({ onEnd }: Props) {
  return (
    <div className="border rounded-md p-6">
      <p className="mb-4">
        🎙️ L'entretien est en cours... Réponds à voix haute.
      </p>

      {/* Plus tard : intégration Vapi ici */}
      <button
        onClick={onEnd}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Terminer l’entretien
      </button>
    </div>
  );
}
