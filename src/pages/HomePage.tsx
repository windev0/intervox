import { AiFillRocket } from "react-icons/ai";
import { FiBarChart2, FiMic, FiTarget } from "react-icons/fi";

const HomePage = () => {
  return (
    <div className="min-h-screen mx-auto px-4 sm:px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Hero section */}
        <section className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Prépare tes entretiens techniques
            <span className="block text-blue-600 mt-2">
              comme dans la vraie vie
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
            Intervox analyse des offres d’emploi réelles et te fait passer des
            entretiens techniques simulés avec un assistant IA vocal, pour
            t’aider à progresser et gagner en confiance.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <a
              href="/analyse"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Analyser une offre
            </a>
            <a
              href="/about"
              className="px-6 py-3 rounded-lg border border-gray-300 font-semibold hover:bg-gray-100 transition"
            >
              Découvrir Intervox
            </a>
          </div>
        </section>

        {/* Illustration + explanation */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src="/assets/img/intervox-illustrator.jpg"
              alt="Préparation entretien technique avec Intervox"
              className="w-full max-w-md mx-auto"
            />
            <p className="text-xs text-gray-400 text-center mt-3">
              Illustration par{" "}
              <a
                href="https://www.freepik.com/free-vector/online-interview-concept-illustration_13867624.htm"
                className="underline"
              >
                Freepik
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">
              Une préparation ciblée, pas générique
            </h2>

            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-2">
                <FiTarget className="text-blue-600 shrink-0" size={20} />
                <span>
                  Analyse automatique des compétences demandées dans l'offre
                </span>
              </li>
              <li className="flex gap-2">
                <FiMic className="text-blue-600 shrink-0" size={20} />
                <span>
                  Entretien technique vocal avec un recruteur IA réaliste
                </span>
              </li>
              <li className="flex gap-2">
                <FiBarChart2 className="text-blue-600 shrink-0" size={20} />
                <span>
                  Feedback clair sur tes réponses, ta logique et ta
                  communication
                </span>
              </li>
              <li className="flex gap-2">
                <AiFillRocket className="text-blue-600 shrink-0" size={20} />
                <span>Progression mesurable session après session</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer note */}
        <section className="mt-16 text-center text-sm text-gray-500">
          Pensé pour les étudiants, juniors et développeurs en montée de
          compétences.
        </section>
      </div>
    </div>
  );
};

export default HomePage;
