import { useState } from "react";

function BudgetTracker({
  totalExpense,
  darkMode,
}) {

  const [budget, setBudget] = useState(50000);

  const remaining = budget - totalExpense;

  const percentage =
    totalExpense > 0
      ? (totalExpense / budget) * 100
      : 0;

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
        Budget Tracker
      </h2>

      {/* Budget Input */}
      <input
        type="number"
        value={budget}
        onChange={(e) =>
          setBudget(Number(e.target.value))
        }
        className="w-full border p-3 rounded-xl mb-4 text-black"
      />

      {/* Budget Details */}
      <div className="space-y-3">

        <div className="flex justify-between">
          <span>Total Budget</span>
          <span>₹{budget}</span>
        </div>

        <div className="flex justify-between">
          <span>Spent</span>
          <span className="text-red-500">
            ₹{totalExpense}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Remaining</span>
          <span className="text-green-500">
            ₹{remaining}
          </span>
        </div>

      </div>

      {/* Progress Bar */}
      <div className="mt-6">

        <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">

          <div
            className={`
              h-full rounded-full
              ${
                percentage > 80
                  ? "bg-red-500"
                  : "bg-green-500"
              }
            `}
            style={{
              width: `${Math.min(percentage, 100)}%`,
            }}
          ></div>

        </div>

      </div>

      {/* Warning */}
      {percentage > 80 && (
        <p className="text-red-500 mt-4 font-semibold">
          Warning: Budget almost exceeded!
        </p>
      )}

    </div>
  );
}

export default BudgetTracker;