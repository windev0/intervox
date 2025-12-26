import Navbar from "./components/NavBar";
import AppRouter from "./config/router";
import "./index.css";

function App() {
  return (
    <>
      {/* nav bar */}
      <AppRouter>
        <Navbar />
      </AppRouter>
      ;
    </>
  );
}

export default App;
