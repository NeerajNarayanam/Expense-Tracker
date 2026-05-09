import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
} from "recharts";

function Analytics({
  expenses,
  darkMode,
}) {

  // CATEGORY DATA
  const categoryData = [];

  const totals = {};

  expenses.forEach((expense) => {

    totals[expense.category] =
      (totals[
        expense.category
      ] || 0) +
      Number(expense.amount);
  });

  for (const category in totals) {

    categoryData.push({
      name: category,
      value: totals[category],
    });
  }

  const COLORS = [
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#10b981",
  ];

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

      <h1 className="
        text-4xl font-black
        mb-10
      ">
        Financial Analytics
      </h1>

      <div className="
        grid grid-cols-1
        xl:grid-cols-2
        gap-10
      ">

        {/* PIE CHART */}
        <div>

          <h2 className="
            text-2xl font-bold
            mb-6
          ">
            Expense Categories
          </h2>

          <div className="
            h-[350px]
          ">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >

                  {categoryData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                            COLORS.length
                          ]
                        }
                      />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}
        <div>

          <h2 className="
            text-2xl font-bold
            mb-6
          ">
            Spending Breakdown
          </h2>

          <div className="
            h-[350px]
          ">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={categoryData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  radius={[10,10,0,0]}
                  fill="#06b6d4"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;