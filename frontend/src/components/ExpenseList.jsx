function ExpenseList({
  expenses,
  deleteExpense,
  darkMode,
}) {

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
        Transactions
      </h2>

      {expenses.length === 0 ? (

        <div className="text-center py-10 text-gray-500">
          No expenses found
        </div>

      ) : (

        <div className="space-y-4 max-h-[500px] overflow-y-auto">

          {expenses.map((expense, index) => (

            <div
              key={index}
              className="flex justify-between items-center border-b pb-3"
            >

              <div>

                <h3 className="font-semibold text-lg">
                  {expense.title}
                </h3>

                <p
                  className={`
                    text-xs px-3 py-1 rounded-full inline-block mt-1
                    ${
                      expense.category === "Food"
                        ? "bg-yellow-100 text-yellow-700"
                        : expense.category === "Travel"
                        ? "bg-blue-100 text-blue-700"
                        : expense.category === "Shopping"
                        ? "bg-pink-100 text-pink-700"
                        : "bg-green-100 text-green-700"
                    }
                  `}
                >
                  {expense.category}
                </p>

              </div>

              <div className="flex items-center gap-3">

                <h2 className="font-bold text-red-500">
                  ₹{expense.amount}
                </h2>

                <button
                  onClick={() => deleteExpense(expense._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default ExpenseList;