import { useState } from "react";

import { motion } from "framer-motion";

import {
  FaUserCircle,
  FaMoon,
  FaBell,
  FaShieldAlt,
  FaPalette,
  FaGlobe,
  FaDownload,
  FaLock,
} from "react-icons/fa";

function Settings() {

  const [notifications,
    setNotifications] =
      useState(true);

  const darkMode =
    localStorage.getItem(
      "theme"
    ) === "dark";

  const toggleTheme = () => {

    const newTheme =
      !darkMode;

    localStorage.setItem(
      "theme",
      newTheme
        ? "dark"
        : "light"
    );

    window.location.reload();
  };

  return (
    <div
      className={`
        min-h-screen
        p-8
        overflow-hidden
        relative
        transition-all duration-300

        ${
          darkMode
            ? `
              bg-gradient-to-br
              from-[#020617]
              via-[#0f172a]
              to-[#111827]
              text-white
            `
            : `
              bg-gradient-to-br
              from-slate-100
              via-blue-50
              to-cyan-50
              text-black
            `
        }
      `}
    >

      {/* GLOW EFFECTS */}
      <div className="
        absolute top-0 left-0
        w-[500px] h-[500px]
        bg-cyan-500/10
        blur-[120px]
        rounded-full
      " />

      <div className="
        absolute bottom-0 right-0
        w-[500px] h-[500px]
        bg-purple-500/10
        blur-[120px]
        rounded-full
      " />

      <div className="
        relative z-10
      ">

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            mb-10
          "
        >

          <p className="
            uppercase tracking-[0.3rem]
            text-cyan-400
            font-semibold
          ">
            Control Center
          </p>

          <h1 className="
            text-6xl font-black
            mt-4
          ">
            Settings
          </h1>

          <p className="
            text-gray-400
            text-lg mt-4
          ">
            Customize your futuristic
            finance experience.
          </p>

        </motion.div>

        {/* GRID */}
        <div className="
          grid grid-cols-1
          xl:grid-cols-3
          gap-8
        ">

          {/* PROFILE CARD */}
          <motion.div
            whileHover={{
              y: -5,
            }}
            className={`
              rounded-[2rem]
              p-8
              border
              backdrop-blur-2xl
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

            <div className="
              flex flex-col
              items-center text-center
            ">

              <div className="
                w-32 h-32 rounded-full
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                flex items-center
                justify-center
                text-6xl text-white
                shadow-2xl
              ">

                <FaUserCircle />

              </div>

              <h2 className="
                text-3xl font-black
                mt-6
              ">
                {localStorage.getItem(
                  "username"
                )}
              </h2>

              <p className="
                text-gray-400 mt-2
              ">
                Premium Member
              </p>

              <div className="
                mt-8 w-full space-y-4
              ">

                <div className="
                  flex justify-between
                  text-sm
                ">

                  <span className="
                    text-gray-400
                  ">
                    Account Type
                  </span>

                  <span className="
                    text-cyan-400
                  ">
                    Pro
                  </span>

                </div>

                <div className="
                  flex justify-between
                  text-sm
                ">

                  <span className="
                    text-gray-400
                  ">
                    Security
                  </span>

                  <span className="
                    text-green-400
                  ">
                    Protected
                  </span>

                </div>

              </div>

            </div>

          </motion.div>

          {/* SETTINGS PANEL */}
          <div className="
            xl:col-span-2
            space-y-8
          ">

            {/* APPEARANCE */}
            <motion.div
              whileHover={{
                y: -5,
              }}
              className={`
                rounded-[2rem]
                p-8
                border
                backdrop-blur-2xl
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

              <div className="
                flex items-center gap-4
                mb-8
              ">

                <div className="
                  w-14 h-14 rounded-2xl
                  bg-cyan-500/20
                  flex items-center
                  justify-center
                  text-cyan-400 text-2xl
                ">

                  <FaPalette />

                </div>

                <div>

                  <h2 className="
                    text-3xl font-black
                  ">
                    Appearance
                  </h2>

                  <p className="
                    text-gray-400 mt-1
                  ">
                    Customize your UI
                  </p>

                </div>

              </div>

              <div
                className={`
                  flex justify-between
                  items-center
                  p-5 rounded-2xl

                  ${
                    darkMode
                      ? "bg-white/5"
                      : "bg-slate-100"
                  }
                `}
              >

                <div className="
                  flex items-center gap-4
                ">

                  <FaMoon className="
                    text-yellow-400
                    text-2xl
                  " />

                  <div>

                    <h3 className="
                      text-xl font-bold
                    ">
                      Dark Mode
                    </h3>

                    <p className="
                      text-gray-400 text-sm
                    ">
                      Enable futuristic theme
                    </p>

                  </div>

                </div>

                <button
                  onClick={toggleTheme}
                  className={`
                    w-20 h-10 rounded-full
                    transition relative

                    ${
                      darkMode
                        ? `
                          bg-cyan-500
                        `
                        : `
                          bg-gray-400
                        `
                    }
                  `}
                >

                  <div
                    className={`
                      absolute top-1
                      w-8 h-8 rounded-full
                      bg-white transition

                      ${
                        darkMode
                          ? "right-1"
                          : "left-1"
                      }
                    `}
                  />

                </button>

              </div>

            </motion.div>

            {/* NOTIFICATIONS */}
            <motion.div
              whileHover={{
                y: -5,
              }}
              className={`
                rounded-[2rem]
                p-8
                border
                backdrop-blur-2xl
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

              <div className="
                flex items-center gap-4
                mb-8
              ">

                <div className="
                  w-14 h-14 rounded-2xl
                  bg-purple-500/20
                  flex items-center
                  justify-center
                  text-purple-400 text-2xl
                ">

                  <FaBell />

                </div>

                <div>

                  <h2 className="
                    text-3xl font-black
                  ">
                    Notifications
                  </h2>

                  <p className="
                    text-gray-400 mt-1
                  ">
                    Manage alerts
                  </p>

                </div>

              </div>

              <div
                className={`
                  flex justify-between
                  items-center
                  p-5 rounded-2xl

                  ${
                    darkMode
                      ? "bg-white/5"
                      : "bg-slate-100"
                  }
                `}
              >

                <div>

                  <h3 className="
                    text-xl font-bold
                  ">
                    Push Notifications
                  </h3>

                  <p className="
                    text-gray-400 text-sm
                  ">
                    Get finance updates
                  </p>

                </div>

                <button
                  onClick={() =>
                    setNotifications(
                      !notifications
                    )
                  }
                  className={`
                    w-20 h-10 rounded-full
                    transition relative

                    ${
                      notifications
                        ? `
                          bg-purple-500
                        `
                        : `
                          bg-gray-400
                        `
                    }
                  `}
                >

                  <div
                    className={`
                      absolute top-1
                      w-8 h-8 rounded-full
                      bg-white transition

                      ${
                        notifications
                          ? "right-1"
                          : "left-1"
                      }
                    `}
                  />

                </button>

              </div>

            </motion.div>

            {/* SECURITY */}
            <motion.div
              whileHover={{
                y: -5,
              }}
              className={`
                rounded-[2rem]
                p-8
                border
                backdrop-blur-2xl
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

              <div className="
                flex items-center gap-4
                mb-8
              ">

                <div className="
                  w-14 h-14 rounded-2xl
                  bg-red-500/20
                  flex items-center
                  justify-center
                  text-red-400 text-2xl
                ">

                  <FaShieldAlt />

                </div>

                <div>

                  <h2 className="
                    text-3xl font-black
                  ">
                    Security
                  </h2>

                  <p className="
                    text-gray-400 mt-1
                  ">
                    Protect your account
                  </p>

                </div>

              </div>

              <div className="
                grid grid-cols-1
                md:grid-cols-2
                gap-5
              ">

                <button
                  className={`
                    p-5 rounded-2xl
                    border flex items-center
                    gap-4 transition

                    ${
                      darkMode
                        ? `
                          bg-white/5
                          border-white/10
                          hover:bg-white/10
                        `
                        : `
                          bg-slate-100
                          border-gray-200
                          hover:bg-slate-200
                        `
                    }
                  `}
                >

                  <FaLock className="
                    text-cyan-400
                  " />

                  Change Password

                </button>

                <button
                  className={`
                    p-5 rounded-2xl
                    border flex items-center
                    gap-4 transition

                    ${
                      darkMode
                        ? `
                          bg-white/5
                          border-white/10
                          hover:bg-white/10
                        `
                        : `
                          bg-slate-100
                          border-gray-200
                          hover:bg-slate-200
                        `
                    }
                  `}
                >

                  <FaDownload className="
                    text-green-400
                  " />

                  Export Data

                </button>

                <button
                  className={`
                    p-5 rounded-2xl
                    border flex items-center
                    gap-4 transition

                    ${
                      darkMode
                        ? `
                          bg-white/5
                          border-white/10
                          hover:bg-white/10
                        `
                        : `
                          bg-slate-100
                          border-gray-200
                          hover:bg-slate-200
                        `
                    }
                  `}
                >

                  <FaGlobe className="
                    text-purple-400
                  " />

                  Language Settings

                </button>

                <button className="
                  p-5 rounded-2xl
                  bg-red-500/20
                  border border-red-500/20
                  text-red-400
                  hover:bg-red-500/30
                  transition
                ">

                  Logout Everywhere

                </button>

              </div>

            </motion.div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;