import { useState } from "react";

function ExpenseForm({ addExpense, darkMode }) {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = (e) => {
    e.preventDefault();

    addExpense({
      title,
      amount,
      category,
      createdAt: new Date(),
    });

    setTitle("");
    setAmount("");
    setCategory("Food");
  };

  return (
    <div
      className={`
        p-6 rounded-3xl shadow
        ${
          darkMode
            ? "bg-gray-800 text-white"
            : "bg-white"
        }
      `}
    >

      <h2 className="text-2xl font-bold mb-6">
        Add Expense
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            w-full border border-gray-600
            bg-transparent
            p-3 rounded-xl
            outline-none
          "
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="
            w-full border border-gray-600
            bg-transparent
            p-3 rounded-xl
            outline-none
          "
          required
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="
            w-full border border-gray-600
            bg-transparent
            p-3 rounded-xl
            outline-none
          "
        >

          <option className="text-black">
            Food
          </option>

          <option className="text-black">
            Travel
          </option>

          <option className="text-black">
            Shopping
          </option>

          <option className="text-black">
            Bills
          </option>

        </select>

        <button
          className="
            w-full bg-blue-600 hover:bg-blue-700
            text-white py-3 rounded-xl
            transition
          "
        >
          Add Expense
        </button>

      </form>

    </div>
  );
}

export default ExpenseForm;