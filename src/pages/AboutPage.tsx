export default function AboutPage() {
  return (
    <div className="min-h-screen  mx-auto p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
          À propos d'Intervox
        </h1>

        <div className="space-y-5">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Intervox est né d'un constat simple : la difficulté à se préparer
            efficacement aux entretiens d'embauche. Trop souvent, les candidats
            manquent de préparation ou ne savent pas structurer leurs réponses à
            l'oral.
          </p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Notre mission est de proposer une{" "}
            <span className="font-semibold text-indigo-600">
              expérience d'entraînement réaliste
            </span>{" "}
            basée sur de vraies offres d'emploi, adaptée à votre niveau et vos
            compétences.
          </p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Au-delà des questions techniques, nous couvrons l'ensemble des
            aspects d'un entretien : motivation, communication, gestion du
            stress et raisonnement logique.
          </p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Grâce à notre{" "}
            <span className="font-semibold text-indigo-600">
              assistant IA conversationnel
            </span>
            , vous vous entraînez en conditions réelles. Les questions
            s'adaptent à vos réponses pour une évaluation plus pertinente.
          </p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Gagnez en confiance, comprenez les attentes des recruteurs et
            abordez vos entretiens avec une préparation ciblée et efficace.
          </p>
        </div>
      </div>
    </div>
  );
}
