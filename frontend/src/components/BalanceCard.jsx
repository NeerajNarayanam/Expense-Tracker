import { motion } from "framer-motion";

import {
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

function BalanceCard({
  title,
  amount,
  darkMode,
}) {

  // CARD THEMES
  const cardThemes = {
    Balance: `
      from-cyan-500
      via-blue-500
      to-indigo-600
    `,
    Income: `
      from-emerald-500
      via-green-500
      to-teal-600
    `,
    Expenses: `
      from-rose-500
      via-pink-500
      to-red-600
    `,
  };

  const isExpense =
    title === "Expenses";

  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
      }}
      className={`
        relative overflow-hidden
        rounded-[2rem]
        p-7
        shadow-2xl
        border
        backdrop-blur-2xl
        ${
          darkMode
            ? `
              bg-white/5
              border-white/10
            `
            : `
              bg-white/80
              border-gray-200
            `
        }
      `}
    >

      {/* GLOW EFFECT */}
      <div
        className={`
          absolute inset-0 opacity-20
          bg-gradient-to-br
          ${cardThemes[title]}
        `}
      />

      {/* CONTENT */}
      <div className="
        relative z-10
      ">

        {/* TOP */}
        <div className="
          flex justify-between
          items-start
        ">

          <div>

            <p className="
              text-gray-400
              text-sm uppercase
              tracking-[0.2rem]
              font-semibold
            ">
              {title}
            </p>

            <h1 className="
              text-4xl font-black
              mt-5
            ">
              {amount}
            </h1>

          </div>

          {/* TREND ICON */}
          <div
            className={`
              w-16 h-16 rounded-2xl
              flex items-center
              justify-center
              text-white text-2xl
              shadow-xl
              bg-gradient-to-br
              ${cardThemes[title]}
            `}
          >

            {isExpense
              ? <FaArrowTrendDown />
              : <FaArrowTrendUp />}

          </div>

        </div>

        {/* FOOTER */}
        <div className="
          mt-8 flex items-center
          justify-between
        ">

          <p className="
            text-sm text-gray-400
          ">
            Updated just now
          </p>

          <div
            className={`
              px-4 py-2 rounded-full
              text-sm font-semibold
              ${
                isExpense
                  ? `
                    bg-red-500/20
                    text-red-400
                  `
                  : `
                    bg-green-500/20
                    text-green-400
                  `
              }
            `}
          >

            {isExpense
              ? "-2.4%"
              : "+12.5%"}

          </div>

        </div>

      </div>

    </motion.div>
  );
}

export default BalanceCard;