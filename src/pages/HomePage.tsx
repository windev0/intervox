const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur Intervox</h1>
      <p className="mb-2">
        Prépare ton entretien technique en analysant des offres d'emploi et en
        passant des entretiens simulés.
      </p>
      <p>
        Commence dès maintenant en cliquant sur "Nouvelle analyse" dans la barre
        de navigation.
      </p>

      <div>
        <img
          src="/assets/home-illustration.png"
          alt="Illustration Accueil"
          className="mt-6 w-full max-w-md"
        />
        <div>
          <p className="text-sm text-gray-500 mt-2">
            Illustration représentant une personne préparant un entretien
            technique avec Intervox.
          </p>
          <p>
            Image by{" "}
            <a
              href="https://www.freepik.com/free-vector/online-interview-concept-illustration_13867624.htm#query=interview&position=1&from_view=search&track=sph"
              className="text-blue-500 underline"
            >
              Freepik
            </a>{" "}
            on Freepik
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
