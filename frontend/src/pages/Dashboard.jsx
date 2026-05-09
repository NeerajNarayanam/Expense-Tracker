import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import BalanceCard from "../components/BalanceCard";
import ExpenseForm from "../components/ExpenseForm";
import IncomeForm from "../components/IncomeForm";
import ExpenseList from "../components/ExpenseList";
import Analytics from "../components/Analytics";
import SearchFilter from "../components/SearchFilter";
import BudgetTracker from "../components/BudgetTracker";

import API from "../services/api";

function Dashboard() {

  // Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Expenses
  const [expenses, setExpenses] = useState([]);

  // Income
  const [income, setIncome] = useState([]);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // FETCH EXPENSES
  const fetchExpenses = async () => {

    try {

      const response = await API.get(
        "/expenses"
      );

      setExpenses(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // FETCH INCOME
  const fetchIncome = async () => {

    try {

      const response = await API.get(
        "/income"
      );

      setIncome(response.data);

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
  const addExpense = async (expense) => {

    try {

      await API.post(
        "/expenses",
        expense
      );

      fetchExpenses();

      toast.success("Expense Added");

    } catch (error) {

      console.log(error);

    }
  };

  // ADD INCOME
  const addIncome = async (newIncome) => {

    try {

      await API.post(
        "/income",
        newIncome
      );

      fetchIncome();

      toast.success("Income Added");

    } catch (error) {

      console.log(error);

    }
  };

  // DELETE EXPENSE
  const deleteExpense = async (
    expenseId
  ) => {

    try {

      await API.delete(
        `/expenses/${expenseId}`
      );

      fetchExpenses();

      toast.error("Expense Deleted");

    } catch (error) {

      console.log(error);

    }
  };

  // SAVE THEME
  useEffect(() => {

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );

  }, [darkMode]);

  // TOTALS
  const totalExpense = expenses.reduce(
    (total, item) =>
      total + Number(item.amount),
    0
  );

  const totalIncome = income.reduce(
    (total, item) =>
      total + Number(item.amount),
    0
  );

  const totalBalance =
    totalIncome - totalExpense;

  // FILTERED EXPENSES
  const filteredExpenses =
    expenses.filter((expense) => {

      const matchesSearch =
        (expense.title || "")
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All" ||
        (expense.category || "") ===
          selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  return (
    <div
      className={`
        flex min-h-screen
        ${
          darkMode
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-br from-gray-100 to-gray-200"
        }
      `}
    >

      {/* Sidebar */}
      <Sidebar darkMode={darkMode} />

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Topbar */}
        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Search */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={
            setSelectedCategory
          }
          darkMode={darkMode}
        />

        {/* Balance Cards */}
        <div
          className="
            grid grid-cols-1
            md:grid-cols-3
            gap-6 mt-6
          "
        >

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

        {/* Forms & Transactions */}
        <div
          className="
            grid grid-cols-1
            xl:grid-cols-3
            gap-6 mt-8
            items-start
          "
        >

          <ExpenseForm
            addExpense={addExpense}
            darkMode={darkMode}
          />

          <IncomeForm
            addIncome={addIncome}
            darkMode={darkMode}
          />

          <ExpenseList
            expenses={filteredExpenses}
            deleteExpense={
              deleteExpense
            }
            darkMode={darkMode}
          />

        </div>

        {/* Analytics */}
        <div className="mt-8">

          <Analytics
            expenses={expenses}
            darkMode={darkMode}
          />

        </div>

        {/* Budget Tracker */}
        <div className="mt-8">

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