import { useEffect, useState } from "react";

import API from "../services/api";

function Transactions() {

  const [expenses, setExpenses] = useState([]);

  const [income, setIncome] = useState([]);

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

  useEffect(() => {

    fetchExpenses();

    fetchIncome();

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-5xl font-bold mb-10">
        Transactions
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Expenses */}
        <div className="
          bg-white p-6 rounded-3xl shadow
        ">

          <h2 className="
            text-3xl font-bold mb-6
            text-red-500
          ">
            Expenses
          </h2>

          <div className="
            space-y-4 max-h-[500px]
            overflow-y-auto
          ">

            {expenses.map((expense) => (

              <div
                key={expense._id}
                className="
                  border rounded-2xl
                  p-4 flex justify-between
                  items-center
                "
              >

                <div>

                  <h3 className="font-bold text-lg">
                    {expense.title}
                  </h3>

                  <p className="text-gray-500">
                    {expense.category}
                  </p>

                </div>

                <h2 className="
                  text-red-500 font-bold text-xl
                ">
                  ₹{expense.amount}
                </h2>

              </div>

            ))}

          </div>

        </div>

        {/* Income */}
        <div className="
          bg-white p-6 rounded-3xl shadow
        ">

          <h2 className="
            text-3xl font-bold mb-6
            text-green-500
          ">
            Income
          </h2>

          <div className="
            space-y-4 max-h-[500px]
            overflow-y-auto
          ">

            {income.map((item) => (

              <div
                key={item._id}
                className="
                  border rounded-2xl
                  p-4 flex justify-between
                  items-center
                "
              >

                <div>

                  <h3 className="font-bold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-gray-500">
                    Income
                  </p>

                </div>

                <h2 className="
                  text-green-500 font-bold text-xl
                ">
                  ₹{item.amount}
                </h2>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Transactions;