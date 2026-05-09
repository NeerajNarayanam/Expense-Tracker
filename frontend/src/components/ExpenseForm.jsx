import { useState } from "react";

import { motion } from "framer-motion";

import {
  FaMoneyBillWave,
  FaTags,
  FaPlus,
} from "react-icons/fa";

function ExpenseForm({
  addExpense,
  darkMode,
}) {

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("Food");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!title || !amount) return;

    addExpense({
      title,
      amount,
      category,
    });

    setTitle("");
    setAmount("");
    setCategory("Food");
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
          Add Expense
        </h1>

        <p className="
          text-gray-400 mt-2
        ">
          Track your spending smartly
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
            Expense Title
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

            <FaMoneyBillWave className="
              text-cyan-400
            " />

            <input
              type="text"
              placeholder="Enter expense title"
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
              text-cyan-400
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

        {/* CATEGORY */}
        <div>

          <label className="
            text-sm font-semibold
            text-gray-400
          ">
            Category
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

            <FaTags className="
              text-cyan-400
            " />

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="
                bg-transparent
                outline-none
                w-full
              "
            >

              <option value="Food">
                Food
              </option>

              <option value="Shopping">
                Shopping
              </option>

              <option value="Transport">
                Transport
              </option>

              <option value="Entertainment">
                Entertainment
              </option>

            </select>

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
            from-cyan-500
            via-blue-500
            to-indigo-600
            text-white font-bold
            text-lg
            shadow-2xl
            flex items-center
            justify-center gap-3
          "
        >

          <FaPlus />

          Add Expense

        </motion.button>

      </form>

    </motion.div>
  );
}

export default ExpenseForm;