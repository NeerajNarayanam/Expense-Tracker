import {
  FaBell,
  FaMoon,
  FaSun,
  FaSearch,
  FaBars,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

function Topbar({
  darkMode,
  setDarkMode,
  setSidebarOpen,
}) {

  const navigate = useNavigate();

  const username =
    localStorage.getItem("username");

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("username");

    toast.success("Logged Out");

    navigate("/login");
  };

  return (
    <motion.div
      initial={{
        y: -40,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className={`
        rounded-[2rem]
        p-6 mb-8
        border
        backdrop-blur-2xl
        flex flex-col lg:flex-row
        justify-between
        items-start lg:items-center
        gap-6
        shadow-2xl
        ${
          darkMode
            ? `
              bg-white/5
              border-white/10
            `
            : `
              bg-white/70
              border-gray-200
            `
        }
      `}
    >

      {/* LEFT */}
      <div className="
        flex items-center gap-5
      ">

        {/* MOBILE MENU */}
        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="
            md:hidden
            w-12 h-12 rounded-2xl
            bg-white/10
            border border-white/10
            flex items-center
            justify-center
          "
        >

          <FaBars />

        </button>

        <div>

          <p className="
            text-sm uppercase
            tracking-[0.3rem]
            text-cyan-400
            font-semibold
          ">
            Welcome Back
          </p>

          <h1 className="
            text-3xl lg:text-5xl
            font-black mt-2
          ">
            {username} 👋
          </h1>

          <p className="
            text-gray-400 mt-3
            text-lg
          ">
            Here's your financial overview
            for today.
          </p>

        </div>

      </div>

      {/* RIGHT */}
      <div className="
        flex flex-wrap items-center
        gap-4 w-full lg:w-auto
      ">

        {/* SEARCH */}
        <div
          className={`
            flex items-center gap-3
            px-5 py-4 rounded-2xl
            min-w-[240px]
            border
            ${
              darkMode
                ? `
                  bg-white/5
                  border-white/10
                `
                : `
                  bg-white
                  border-gray-200
                `
            }
          `}
        >

          <FaSearch className="
            text-cyan-400
          " />

          <input
            type="text"
            placeholder="Search..."
            className="
              bg-transparent
              outline-none
              w-full
            "
          />

        </div>

        {/* DARK MODE */}
        <motion.button
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className={`
            p-4 rounded-2xl
            border transition
            ${
              darkMode
                ? `
                  bg-white/5
                  border-white/10
                  text-yellow-400
                `
                : `
                  bg-white
                  border-gray-200
                `
            }
          `}
        >

          {darkMode
            ? <FaSun />
            : <FaMoon />}

        </motion.button>

        {/* BELL */}
        <motion.button
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className={`
            p-4 rounded-2xl
            border transition
            ${
              darkMode
                ? `
                  bg-white/5
                  border-white/10
                `
                : `
                  bg-white
                  border-gray-200
                `
            }
          `}
        >

          <FaBell />

        </motion.button>

        {/* LOGOUT */}
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={handleLogout}
          className="
            px-6 py-4 rounded-2xl
            bg-gradient-to-r
            from-red-500
            to-pink-500
            text-white
            font-semibold
            shadow-xl
          "
        >
          Logout
        </motion.button>

      </div>

    </motion.div>
  );
}

export default Topbar;