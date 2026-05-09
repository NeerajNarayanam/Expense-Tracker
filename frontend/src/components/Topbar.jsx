import {
  FaBell,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

function Topbar({
  darkMode,
  setDarkMode,
}) {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    toast.success("Logged Out");

    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center mb-8">

      <div>

        <h1 className="text-5xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-2 text-lg">
          Manage your expenses smartly
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Welcome back, Neeraj 👋
        </p>

      </div>

      <div className="flex items-center gap-4">

        {/* Dark Mode */}
        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className={`
            p-4 rounded-full shadow-lg transition
            ${
              darkMode
                ? "bg-gray-800 text-yellow-400"
                : "bg-white"
            }
          `}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Notification */}
        <button
          className={`
            p-4 rounded-full shadow-lg transition
            ${
              darkMode
                ? "bg-gray-800"
                : "bg-white"
            }
          `}
        >
          <FaBell />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            bg-red-500 hover:bg-red-600
            text-white px-5 py-3
            rounded-xl transition
          "
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Topbar;