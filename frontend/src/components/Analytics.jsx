import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics({ expenses, darkMode }) {

  const categoryData = {};

  expenses.forEach((expense) => {

    if (categoryData[expense.category]) {
      categoryData[expense.category] += Number(expense.amount);
    } else {
      categoryData[expense.category] = Number(expense.amount);
    }

  });

  const data = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  const COLORS = [
    "#facc15",
    "#60a5fa",
    "#f472b6",
    "#4ade80",
  ];

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
        Expense Analytics
      </h2>

      {expenses.length === 0 ? (

        <div className="text-center py-10 text-gray-500">
          Add expenses to view analytics
        </div>

      ) : (

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >

                {data.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      )}

    </div>
  );
}

export default Analytics;