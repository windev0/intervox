import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / App name */}
        <div className="text-xl font-bold tracking-wide">
          <NavLink to="/" className="hover:text-blue-400 transition">
            Intervox
          </NavLink>
        </div>

        {/* Navigation links */}
        <div className="flex items-center space-x-6 text-sm sm:text-base">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-blue-400 transition ${
                isActive ? "text-blue-400 font-semibold" : ""
              }`
            }
          >
            Accueil
          </NavLink>

          <NavLink
            to="/offer-input"
            className={({ isActive }) =>
              `hover:text-blue-400 transition ${
                isActive ? "text-blue-400 font-semibold" : ""
              }`
            }
          >
            Nouvelle analyse
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
