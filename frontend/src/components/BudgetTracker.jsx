function BudgetTracker({
  totalExpense,
  darkMode,
}) {

  const budget = 50000;

  const percentage =
    (totalExpense / budget) * 100;

  return (
    <div
      className={`
        rounded-[2rem]
        p-8
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

      <div className="
        flex justify-between
        items-center mb-6
      ">

        <div>

          <h1 className="
            text-3xl font-black
          ">
            Budget Tracker
          </h1>

          <p className="
            text-gray-400 mt-2
          ">
            Monitor your spending limit
          </p>

        </div>

        <h2 className="
          text-2xl font-black
        ">
          ₹{budget}
        </h2>

      </div>

      {/* PROGRESS */}
      <div className="
        w-full h-5 rounded-full
        bg-white/10 overflow-hidden
      ">

        <div
          style={{
            width: `${percentage}%`,
          }}
          className="
            h-full rounded-full
            bg-gradient-to-r
            from-cyan-500
            via-blue-500
            to-indigo-600
          "
        />

      </div>

      <div className="
        flex justify-between
        mt-5 text-sm
      ">

        <p className="text-gray-400">
          Spent: ₹{totalExpense}
        </p>

        <p className="text-cyan-400">
          {percentage.toFixed(1)}%
        </p>

      </div>

    </div>
  );
}

export default BudgetTracker;