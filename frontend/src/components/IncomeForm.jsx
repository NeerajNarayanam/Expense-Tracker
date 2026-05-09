import { useState } from "react";

import { motion } from "framer-motion";

import {
  FaWallet,
  FaPlus,
} from "react-icons/fa";

function IncomeForm({
  addIncome,
  darkMode,
}) {

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!title || !amount) return;

    addIncome({
      title,
      amount,
    });

    setTitle("");
    setAmount("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-[2rem]
        p-7
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
              bg-white/80
              border-gray-200
            `
        }
      `}
    >

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="
          text-3xl font-black
        ">
          Add Income
        </h1>

        <p className="
          text-gray-400 mt-2
        ">
          Track your earnings easily
        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* TITLE */}
        <div>

          <label className="
            text-sm font-semibold
            text-gray-400
          ">
            Income Source
          </label>

          <div
            className={`
              mt-3 flex items-center
              gap-4 px-5 py-4
              rounded-2xl border
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

            <FaWallet className="
              text-emerald-400
            " />

            <input
              type="text"
              placeholder="Enter income source"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="
                bg-transparent
                outline-none
                w-full
              "
            />

          </div>

        </div>

        {/* AMOUNT */}
        <div>

          <label className="
            text-sm font-semibold
            text-gray-400
          ">
            Amount
          </label>

          <div
            className={`
              mt-3 flex items-center
              gap-4 px-5 py-4
              rounded-2xl border
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

            <span className="
              text-emerald-400
              font-bold
            ">
              ₹
            </span>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              className="
                bg-transparent
                outline-none
                w-full
              "
            />

          </div>

        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="
            w-full py-4 rounded-2xl
            bg-gradient-to-r
            from-emerald-500
            via-green-500
            to-teal-600
            text-white font-bold
            text-lg
            shadow-2xl
            flex items-center
            justify-center gap-3
          "
        >

          <FaPlus />

          Add Income

        </motion.button>

      </form>

    </motion.div>
  );
}

export default IncomeForm;