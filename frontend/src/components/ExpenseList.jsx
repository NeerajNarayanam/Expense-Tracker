import { useState } from "react";

import {
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaUtensils,
  FaShoppingBag,
  FaCar,
  FaFilm,
  FaMoneyBillWave,
} from "react-icons/fa";

import { motion } from "framer-motion";

function ExpenseList({
  expenses,
  deleteExpense,
  updateExpense,
  darkMode,
}) {

  // EDIT STATES
  const [editingId,
    setEditingId] =
      useState(null);

  const [editedTitle,
    setEditedTitle] =
      useState("");

  const [editedAmount,
    setEditedAmount] =
      useState("");

  const [editedCategory,
    setEditedCategory] =
      useState("");

  // CATEGORY ICONS
  const getCategoryIcon = (
    category
  ) => {

    switch (category) {

      case "Food":
        return <FaUtensils />;

      case "Shopping":
        return <FaShoppingBag />;

      case "Transport":
        return <FaCar />;

      case "Entertainment":
        return <FaFilm />;

      default:
        return <FaMoneyBillWave />;
    }
  };

  // CATEGORY COLORS
  const getCategoryColor = (
    category
  ) => {

    switch (category) {

      case "Food":
        return `
          from-orange-500
          to-red-500
        `;

      case "Shopping":
        return `
          from-pink-500
          to-rose-500
        `;

      case "Transport":
        return `
          from-blue-500
          to-cyan-500
        `;

      case "Entertainment":
        return `
          from-purple-500
          to-indigo-500
        `;

      default:
        return `
          from-emerald-500
          to-green-500
        `;
    }
  };

  // START EDIT
  const startEdit = (
    expense
  ) => {

    setEditingId(
      expense._id
    );

    setEditedTitle(
      expense.title
    );

    setEditedAmount(
      expense.amount
    );

    setEditedCategory(
      expense.category
    );
  };

  // SAVE EDIT
  const handleUpdate = (
    expense
  ) => {

    updateExpense(
      expense._id,
      {
        ...expense,
        title: editedTitle,
        amount: editedAmount,
        category:
          editedCategory,
      }
    );

    setEditingId(null);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className={`
        rounded-[2rem]
        p-6
        border
        shadow-2xl
        backdrop-blur-2xl
        h-fit

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
      <div className="
        flex justify-between
        items-center mb-8
      ">

        <div>

          <h1 className="
            text-3xl font-black
          ">
            Recent Expenses
          </h1>

          <p className="
            text-gray-400 mt-2
          ">
            Your latest transactions
          </p>

        </div>

        <div
          className="
            px-4 py-2 rounded-full
            bg-gradient-to-r
            from-cyan-500
            to-blue-500
            text-white text-sm
            font-semibold
          "
        >
          {expenses.length} Items
        </div>

      </div>

      {/* LIST */}
      <div className="
        space-y-5
        max-h-[550px]
        overflow-y-auto
        pr-2
      ">

        {expenses.length === 0 ? (

          <div className="
            text-center py-16
            text-gray-400
          ">

            <h2 className="
              text-2xl font-bold
            ">
              No Expenses Yet
            </h2>

            <p className="mt-3">
              Start adding transactions
            </p>

          </div>

        ) : (

          expenses.map((expense) => (

            <motion.div
              whileHover={{
                scale: 1.02,
                y: -3,
              }}
              key={expense._id}
              className={`
                rounded-3xl p-5
                border
                transition

                ${
                  darkMode
                    ? `
                      bg-white/5
                      border-white/10
                    `
                    : `
                      bg-white
                      border-gray-100
                    `
                }
              `}
            >

              {editingId ===
                expense._id ? (

                /* EDIT MODE */
                <div className="
                  space-y-5
                ">

                  {/* TITLE */}
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) =>
                      setEditedTitle(
                        e.target.value
                      )
                    }
                    className={`
                      w-full p-4
                      rounded-2xl
                      outline-none border

                      ${
                        darkMode
                          ? `
                            bg-white/5
                            border-white/10
                          `
                          : `
                            bg-slate-100
                            border-gray-200
                          `
                      }
                    `}
                  />

                  {/* AMOUNT */}
                  <input
                    type="number"
                    value={editedAmount}
                    onChange={(e) =>
                      setEditedAmount(
                        e.target.value
                      )
                    }
                    className={`
                      w-full p-4
                      rounded-2xl
                      outline-none border

                      ${
                        darkMode
                          ? `
                            bg-white/5
                            border-white/10
                          `
                          : `
                            bg-slate-100
                            border-gray-200
                          `
                      }
                    `}
                  />

                  {/* CATEGORY */}
                  <select
                    value={
                      editedCategory
                    }
                    onChange={(e) =>
                      setEditedCategory(
                        e.target.value
                      )
                    }
                    className={`
                      w-full p-4
                      rounded-2xl
                      outline-none border

                      ${
                        darkMode
                          ? `
                            bg-white/5
                            border-white/10
                          `
                          : `
                            bg-slate-100
                            border-gray-200
                          `
                      }
                    `}
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

                  {/* BUTTONS */}
                  <div className="
                    flex gap-4
                  ">

                    {/* SAVE */}
                    <button
                      onClick={() =>
                        handleUpdate(
                          expense
                        )
                      }
                      className="
                        flex-1 py-4 rounded-2xl
                        bg-gradient-to-r
                        from-green-500
                        to-emerald-600
                        text-white font-bold
                        flex items-center
                        justify-center gap-2
                      "
                    >

                      <FaCheck />

                      Save

                    </button>

                    {/* CANCEL */}
                    <button
                      onClick={() =>
                        setEditingId(
                          null
                        )
                      }
                      className="
                        flex-1 py-4 rounded-2xl
                        bg-gradient-to-r
                        from-red-500
                        to-pink-600
                        text-white font-bold
                        flex items-center
                        justify-center gap-2
                      "
                    >

                      <FaTimes />

                      Cancel

                    </button>

                  </div>

                </div>

              ) : (

                /* NORMAL MODE */
                <div className="
                  flex justify-between
                  items-center
                  gap-5
                ">

                  {/* LEFT */}
                  <div className="
                    flex items-center gap-5
                  ">

                    {/* ICON */}
                    <div
                      className={`
                        w-16 h-16 rounded-2xl
                        flex items-center
                        justify-center
                        text-white text-2xl
                        shadow-xl
                        bg-gradient-to-br
                        ${getCategoryColor(
                          expense.category
                        )}
                      `}
                    >

                      {getCategoryIcon(
                        expense.category
                      )}

                    </div>

                    {/* DETAILS */}
                    <div>

                      <h2 className="
                        text-xl font-bold
                      ">
                        {expense.title}
                      </h2>

                      <div className="
                        flex items-center gap-3
                        mt-2
                      ">

                        <span
                          className={`
                            px-3 py-1 rounded-full
                            text-xs font-semibold
                            bg-gradient-to-r
                            ${getCategoryColor(
                              expense.category
                            )}
                            text-white
                          `}
                        >
                          {expense.category}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="
                    flex items-center gap-4
                  ">

                    <h1 className="
                      text-2xl font-black
                      text-red-400
                    ">
                      ₹{expense.amount}
                    </h1>

                    {/* EDIT */}
                    <button
                      onClick={() =>
                        startEdit(
                          expense
                        )
                      }
                      className="
                        w-12 h-12 rounded-2xl
                        bg-cyan-500/20
                        text-cyan-400
                        flex items-center
                        justify-center
                      "
                    >

                      <FaEdit />

                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        deleteExpense(
                          expense._id
                        )
                      }
                      className="
                        w-12 h-12 rounded-2xl
                        bg-red-500/20
                        text-red-400
                        flex items-center
                        justify-center
                      "
                    >

                      <FaTrash />

                    </button>

                  </div>

                </div>

              )}

            </motion.div>

          ))

        )}

      </div>

    </motion.div>
  );
}

export default ExpenseList;