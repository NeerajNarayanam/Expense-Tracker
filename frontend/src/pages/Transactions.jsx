import { useEffect, useState } from "react";

import {
  FaArrowDown,
  FaArrowUp,
  FaWallet,
} from "react-icons/fa6";

import { motion } from "framer-motion";

import API from "../services/api";

function Transactions() {

  const darkMode =
    localStorage.getItem("theme")
    === "dark";

  const [expenses, setExpenses] =
    useState([]);

  const [income, setIncome] =
    useState([]);

  const [activeTab, setActiveTab] =
    useState("All");

  // FETCH EXPENSES
  const fetchExpenses = async () => {

    try {

      const response =
        await API.get("/expenses");

      setExpenses(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // FETCH INCOME
  const fetchIncome = async () => {

    try {

      const response =
        await API.get("/income");

      setIncome(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchExpenses();

    fetchIncome();

  }, []);

  const totalExpense =
    expenses.reduce(
      (total, item) =>
        total + Number(item.amount),
      0
    );

  const totalIncome =
    income.reduce(
      (total, item) =>
        total + Number(item.amount),
      0
    );

  return (
    <div
      className={`
        min-h-screen
        p-8
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

      {/* HERO */}
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
          rounded-[2.5rem]
          p-8
          border
          backdrop-blur-2xl
          shadow-2xl
          mb-10

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
          flex flex-col lg:flex-row
          justify-between gap-8
        ">

          <div>

            <p className="
              uppercase tracking-[0.3rem]
              text-cyan-400
              font-semibold
            ">
              Financial Activity
            </p>

            <h1 className="
              text-6xl font-black
              mt-4
            ">
              Transactions
            </h1>

            <p className="
              text-gray-400
              text-lg mt-4
            ">
              Track your complete
              financial activity.
            </p>

          </div>

          {/* STATS */}
          <div className="
            grid grid-cols-2 gap-6
          ">

            <div className="
              rounded-3xl p-6
              bg-emerald-500/10
              border border-emerald-500/20
            ">

              <FaArrowUp className="
                text-4xl text-green-400
              " />

              <h2 className="
                text-3xl font-black mt-5
              ">
                ₹{totalIncome}
              </h2>

              <p className="
                text-gray-400 mt-2
              ">
                Total Income
              </p>

            </div>

            <div className="
              rounded-3xl p-6
              bg-red-500/10
              border border-red-500/20
            ">

              <FaArrowDown className="
                text-4xl text-red-400
              " />

              <h2 className="
                text-3xl font-black mt-5
              ">
                ₹{totalExpense}
              </h2>

              <p className="
                text-gray-400 mt-2
              ">
                Total Expense
              </p>

            </div>

          </div>

        </div>

      </motion.div>

      {/* FILTERS */}
      <div className="
        flex gap-4 mb-8
        flex-wrap
      ">

        {["All", "Income", "Expenses"]
          .map((tab) => (

            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab)
              }
              className={`
                px-6 py-3 rounded-2xl
                font-semibold transition

                ${
                  activeTab === tab
                    ? `
                      bg-gradient-to-r
                      from-cyan-500
                      to-blue-500
                      text-white
                    `
                    : darkMode
                    ? `
                      bg-white/5
                      border border-white/10
                    `
                    : `
                      bg-white
                      border border-gray-200
                    `
                }
              `}
            >
              {tab}
            </button>

        ))}

      </div>

      {/* TRANSACTIONS */}
      <div className="
        grid grid-cols-1
        xl:grid-cols-2
        gap-8
      ">

        {/* EXPENSES */}
        {(activeTab === "All" ||
          activeTab === "Expenses") && (

          <div
            className={`
              rounded-[2rem]
              p-6
              backdrop-blur-2xl
              border

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

            <h2 className="
              text-3xl font-black
              mb-8
            ">
              Expenses
            </h2>

            <div className="
              space-y-5
            ">

              {expenses.map((expense) => (

                <motion.div
                  whileHover={{
                    scale: 1.02,
                  }}
                  key={expense._id}
                  className={`
                    rounded-3xl
                    p-5
                    border
                    flex justify-between
                    items-center

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

                  <div className="
                    flex items-center gap-5
                  ">

                    <div className="
                      w-14 h-14 rounded-2xl
                      bg-red-500/20
                      flex items-center
                      justify-center
                    ">

                      <FaArrowDown
                        className="
                          text-red-400
                          text-xl
                        "
                      />

                    </div>

                    <div>

                      <h2 className="
                        text-xl font-bold
                      ">
                        {expense.title}
                      </h2>

                      <p className="
                        text-gray-400 mt-1
                      ">
                        {expense.category}
                      </p>

                    </div>

                  </div>

                  <h1 className="
                    text-2xl font-black
                    text-red-400
                  ">
                    -₹{expense.amount}
                  </h1>

                </motion.div>

              ))}

            </div>

          </div>

        )}

        {/* INCOME */}
        {(activeTab === "All" ||
          activeTab === "Income") && (

          <div
            className={`
              rounded-[2rem]
              p-6
              backdrop-blur-2xl
              border

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

            <h2 className="
              text-3xl font-black
              mb-8
            ">
              Income
            </h2>

            <div className="
              space-y-5
            ">

              {income.map((item) => (

                <motion.div
                  whileHover={{
                    scale: 1.02,
                  }}
                  key={item._id}
                  className={`
                    rounded-3xl
                    p-5
                    border
                    flex justify-between
                    items-center

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

                  <div className="
                    flex items-center gap-5
                  ">

                    <div className="
                      w-14 h-14 rounded-2xl
                      bg-green-500/20
                      flex items-center
                      justify-center
                    ">

                      <FaWallet
                        className="
                          text-green-400
                          text-xl
                        "
                      />

                    </div>

                    <div>

                      <h2 className="
                        text-xl font-bold
                      ">
                        {item.title}
                      </h2>

                      <p className="
                        text-gray-400 mt-1
                      ">
                        Income Source
                      </p>

                    </div>

                  </div>

                  <h1 className="
                    text-2xl font-black
                    text-green-400
                  ">
                    +₹{item.amount}
                  </h1>

                </motion.div>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Transactions;