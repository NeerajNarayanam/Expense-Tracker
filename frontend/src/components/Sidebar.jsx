import {
  FaChartPie,
  FaWallet,
  FaCog,
  FaMoneyBillWave,
  FaTimes,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import { motion } from "framer-motion";

function Sidebar({
  darkMode,
  sidebarOpen,
  setSidebarOpen,
}) {

  const navItems = [
    {
      name: "Dashboard",
      icon: <FaChartPie />,
      path: "/",
    },
    {
      name: "Transactions",
      icon: <FaMoneyBillWave />,
      path: "/transactions",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (

        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            fixed inset-0
            bg-black/50
            z-40 md:hidden
          "
        />

      )}

      {/* SIDEBAR */}
      <motion.div
        initial={{ x: -100 }}
        animate={{
          x: 0,
        }}
        className={`
          fixed md:sticky
          top-0 left-0
          z-50
          w-[280px]
          min-h-screen
          p-6
          border-r
          backdrop-blur-2xl
          flex flex-col
          justify-between
          transition-transform duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }

          ${
            darkMode
              ? `
                bg-[#0f172a]/95
                border-white/10
                text-white
              `
              : `
                bg-white/90
                border-gray-200
                text-black
              `
          }
        `}
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            md:hidden
            absolute top-6 right-6
            text-2xl
          "
        >

          <FaTimes />

        </button>

        {/* TOP */}
        <div>

          {/* LOGO */}
          <div className="
            flex items-center gap-4
            mb-14
          ">

            <div
              className="
                w-14 h-14 rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                flex items-center
                justify-center
                text-white text-2xl
              "
            >

              <FaWallet />

            </div>

            <div>

              <h1 className="
                text-2xl font-black
              ">
                NexSpend
              </h1>

              <p className="
                text-sm text-gray-400
              ">
                Smart Finance
              </p>

            </div>

          </div>

          {/* NAVIGATION */}
          <div className="
            space-y-4
          ">

            {navItems.map((item) => (

              <NavLink
                key={item.name}
                to={item.path}
                onClick={() =>
                  setSidebarOpen(false)
                }
                className={({ isActive }) =>
                  `
                  flex items-center gap-4
                  px-5 py-4 rounded-2xl
                  transition-all duration-300

                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-cyan-500
                        to-blue-500
                        text-white
                        shadow-xl
                      `
                      : `
                        hover:bg-white/10
                      `
                  }
                  `
                }
              >

                <div className="
                  text-xl
                ">
                  {item.icon}
                </div>

                <span className="
                  text-lg font-semibold
                ">
                  {item.name}
                </span>

              </NavLink>

            ))}

          </div>

        </div>

        {/* USER CARD */}
        <div
          className="
            rounded-3xl p-5
            bg-white/5
            border border-white/10
          "
        >

          <h2 className="
            text-xl font-bold
          ">
            {localStorage.getItem(
              "username"
            )}
          </h2>

          <p className="
            text-gray-400 mt-1
          ">
            Premium User
          </p>

        </div>

      </motion.div>
    </>
  );
}

export default Sidebar;