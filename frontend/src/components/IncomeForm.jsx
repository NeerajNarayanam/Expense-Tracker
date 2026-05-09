import { useState } from "react";

function IncomeForm({ addIncome, darkMode }) {

  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addIncome({
      source,
      amount,
      createdAt: new Date(),
    });

    setSource("");
    setAmount("");
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
        Add Income
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Income Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full border p-3 rounded-xl"
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-3 rounded-xl"
          required
        />

        <button className="w-full bg-green-600 text-white py-3 rounded-xl">
          Add Income
        </button>

      </form>

    </div>
  );
}

export default IncomeForm;