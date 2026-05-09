import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  FaArrowTrendUp,
  FaWallet,
  FaBolt,
} from "react-icons/fa6";

import { motion } from "framer-motion";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import BalanceCard from "../components/BalanceCard";
import ExpenseForm from "../components/ExpenseForm";
import IncomeForm from "../components/IncomeForm";
import ExpenseList from "../components/ExpenseList";
import Analytics from "../components/Analytics";
import BudgetTracker from "../components/BudgetTracker";

import API from "../services/api";

import {
  exportCSV,
  exportPDF,
} from "../utils/exportUtils";

function Dashboard() {

  // SIDEBAR
  const [sidebarOpen,
    setSidebarOpen] =
      useState(false);

  // DARK MODE
  const [darkMode,
    setDarkMode] =
      useState(() => {

        return (
          localStorage.getItem(
            "theme"
          ) === "dark"
        );
      });

  // EXPENSES
  const [expenses,
    setExpenses] =
      useState([]);

  // INCOME
  const [income,
    setIncome] =
      useState([]);

  // FETCH EXPENSES
  const fetchExpenses =
    async () => {

      try {

        const response =
          await API.get(
            "/expenses"
          );

        setExpenses(
          response.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  // FETCH INCOME
  const fetchIncome =
    async () => {

      try {

        const response =
          await API.get(
            "/income"
          );

        setIncome(
          response.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  // LOAD DATA
  useEffect(() => {

    fetchExpenses();

    fetchIncome();

  }, []);

  // ADD EXPENSE
  const addExpense =
    async (expense) => {

      try {

        await API.post(
          "/expenses",
          expense
        );

        fetchExpenses();

        toast.success(
          "Expense Added"
        );

      } catch (error) {

        console.log(error);

      }
    };

  // ADD INCOME
  const addIncome =
    async (newIncome) => {

      try {

        await API.post(
          "/income",
          newIncome
        );

        fetchIncome();

        toast.success(
          "Income Added"
        );

      } catch (error) {

        console.log(error);

      }
    };

  // DELETE EXPENSE
  const deleteExpense =
    async (expenseId) => {

      try {

        await API.delete(
          `/expenses/${expenseId}`
        );

        fetchExpenses();

        toast.error(
          "Expense Deleted"
        );

      } catch (error) {

        console.log(error);

      }
    };

  // UPDATE EXPENSE
  const updateExpense =
    async (
      expenseId,
      updatedExpense
    ) => {

      try {

        await API.put(
          `/expenses/${expenseId}`,
          updatedExpense
        );

        fetchExpenses();

        toast.success(
          "Expense Updated"
        );

      } catch (error) {

        console.log(error);

      }
    };

  // SAVE THEME
  useEffect(() => {

    localStorage.setItem(
      "theme",
      darkMode
        ? "dark"
        : "light"
    );

  }, [darkMode]);

  // TOTAL EXPENSE
  const totalExpense =
    expenses.reduce(
      (total, item) =>
        total +
        Number(item.amount),
      0
    );

  // TOTAL INCOME
  const totalIncome =
    income.reduce(
      (total, item) =>
        total +
        Number(item.amount),
      0
    );

  // BALANCE
  const totalBalance =
    totalIncome -
    totalExpense;

  // CATEGORY TOTALS
  const categoryTotals = {};

  expenses.forEach(
    (expense) => {

      categoryTotals[
        expense.category
      ] =
        (categoryTotals[
          expense.category
        ] || 0) +
        Number(
          expense.amount
        );
    }
  );

  const topCategory =
    Object.keys(
      categoryTotals
    ).sort(
      (a, b) =>
        categoryTotals[b] -
        categoryTotals[a]
    )[0] || "None";

  return (
    <div
      className={`
        flex min-h-screen
        overflow-hidden
        relative

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

      {/* BACKGROUND GLOWS */}
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

      {/* SIDEBAR */}
      <Sidebar
        darkMode={darkMode}
        sidebarOpen={
          sidebarOpen
        }
        setSidebarOpen={
          setSidebarOpen
        }
      />

      {/* MAIN */}
      <div className="
        flex-1 p-4 md:p-8
        overflow-y-auto
        relative z-10
      ">

        {/* TOPBAR */}
        <Topbar
          darkMode={darkMode}
          setDarkMode={
            setDarkMode
          }
          setSidebarOpen={
            setSidebarOpen
          }
        />

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
            p-6 md:p-8
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
                  bg-white/80
                  border-gray-200
                `
            }
          `}
        >

          <div className="
            flex flex-col
            xl:flex-row
            justify-between
            gap-10
          ">

            {/* LEFT */}
            <div>

              <p className="
                uppercase tracking-[0.3rem]
                text-cyan-400
                font-semibold
              ">
                Financial Overview
              </p>

              <h1 className="
                text-4xl md:text-6xl
                font-black mt-4
              ">
                ₹{totalBalance}
              </h1>

              <p className="
                text-gray-400
                text-lg mt-4
                max-w-2xl
              ">
                Your smart financial
                ecosystem is performing
                efficiently this month.
              </p>

              {/* EXPORT BUTTONS */}
              <div className="
                flex flex-wrap gap-4 mt-8
              ">

                {/* PDF */}
                <button
                  onClick={() =>
                    exportPDF(
                      expenses,
                      income,
                      totalIncome,
                      totalExpense,
                      totalBalance
                    )
                  }
                  className="
                    px-6 py-4 rounded-2xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-500
                    text-white font-semibold
                    shadow-xl
                    hover:scale-105
                    transition
                  "
                >
                  Export PDF
                </button>

                {/* CSV */}
                <button
                  onClick={() =>
                    exportCSV(
                      expenses,
                      income
                    )
                  }
                  className="
                    px-6 py-4 rounded-2xl
                    bg-gradient-to-r
                    from-emerald-500
                    to-green-500
                    text-white font-semibold
                    shadow-xl
                    hover:scale-105
                    transition
                  "
                >
                  Export CSV
                </button>

              </div>

            </div>

            {/* STATS */}
            <div className="
              grid grid-cols-1
              md:grid-cols-3
              gap-6 flex-1
            ">

              {/* GROWTH */}
              <div className="
                rounded-3xl p-6
                bg-gradient-to-br
                from-cyan-500/20
                to-blue-500/20
                border border-cyan-500/20
              ">

                <FaArrowTrendUp
                  className="
                    text-4xl
                    text-cyan-400
                  "
                />

                <h2 className="
                  text-3xl font-black
                  mt-6
                ">
                  +18%
                </h2>

                <p className="
                  text-gray-400 mt-2
                ">
                  Monthly Growth
                </p>

              </div>

              {/* TRANSACTIONS */}
              <div className="
                rounded-3xl p-6
                bg-gradient-to-br
                from-emerald-500/20
                to-green-500/20
                border border-green-500/20
              ">

                <FaWallet
                  className="
                    text-4xl
                    text-green-400
                  "
                />

                <h2 className="
                  text-3xl font-black
                  mt-6
                ">
                  {expenses.length}
                </h2>

                <p className="
                  text-gray-400 mt-2
                ">
                  Transactions
                </p>

              </div>

              {/* TOP CATEGORY */}
              <div className="
                rounded-3xl p-6
                bg-gradient-to-br
                from-purple-500/20
                to-pink-500/20
                border border-purple-500/20
              ">

                <FaBolt
                  className="
                    text-4xl
                    text-purple-400
                  "
                />

                <h2 className="
                  text-3xl font-black
                  mt-6
                ">
                  {topCategory}
                </h2>

                <p className="
                  text-gray-400 mt-2
                ">
                  Top Category
                </p>

              </div>

            </div>

          </div>

        </motion.div>

        {/* BALANCE CARDS */}
        <div className="
          grid grid-cols-1
          md:grid-cols-3
          gap-8
        ">

          <BalanceCard
            title="Balance"
            amount={`₹${totalBalance}`}
            darkMode={darkMode}
          />

          <BalanceCard
            title="Income"
            amount={`₹${totalIncome}`}
            darkMode={darkMode}
          />

          <BalanceCard
            title="Expenses"
            amount={`₹${totalExpense}`}
            darkMode={darkMode}
          />

        </div>

        {/* FORMS + LIST */}
        <div className="
          grid grid-cols-1
          xl:grid-cols-3
          gap-8 mt-10
        ">

          <ExpenseForm
            addExpense={addExpense}
            darkMode={darkMode}
          />

          <IncomeForm
            addIncome={addIncome}
            darkMode={darkMode}
          />

          <ExpenseList
            expenses={expenses}
            deleteExpense={
              deleteExpense
            }
            updateExpense={
              updateExpense
            }
            darkMode={darkMode}
          />

        </div>

        {/* ANALYTICS */}
        <div className="
          mt-12
        ">

          <Analytics
            expenses={expenses}
            darkMode={darkMode}
          />

        </div>

        {/* BUDGET TRACKER */}
        <div className="
          mt-12
        ">

          <BudgetTracker
            totalExpense={
              totalExpense
            }
            darkMode={darkMode}
          />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;