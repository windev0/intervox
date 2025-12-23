import AppRouter from "./config/router";
import "./index.css";

function App() {

  return (
    <>
      {/* nav bar */}
      <div>
        <nav className="p-4 bg-gray-800 text-white flex justify-between">
          <div className="text-lg font-bold">Intervox</div>
          <div>
            <a href="/" className="mr-4 hover:underline">
              Accueil
            </a>
            <a href="/offer-input" className="hover:underline">
              Nouvelle analyse
            </a>
          </div>
        </nav>
      </div>
      <AppRouter />;
    </>
  );
}

export default App;
