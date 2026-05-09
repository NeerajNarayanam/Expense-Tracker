import {
  FaWallet,
  FaChartPie,
  FaMoneyBillWave,
  FaCog,
} from "react-icons/fa";

function Sidebar({ darkMode }) {
  return (
    <div
      className={`
        w-64 hidden md:flex flex-col justify-between p-6
        ${
          darkMode
            ? "bg-black text-white"
            : "bg-white text-black"
        }
      `}
    >

      <div>

        <h1 className="text-4xl font-extrabold mb-12">
          ExpenseX
        </h1>

        <ul className="space-y-3">

          <li
            className="
              flex items-center gap-3
              hover:bg-gray-800
              px-4 py-3 rounded-xl
              cursor-pointer transition
            "
          >
            <FaWallet />
            Dashboard
          </li>

          <li
            className="
              flex items-center gap-3
              hover:bg-gray-800
              px-4 py-3 rounded-xl
              cursor-pointer transition
            "
          >
            <FaMoneyBillWave />
            Transactions
          </li>

          <li
            className="
              flex items-center gap-3
              hover:bg-gray-800
              px-4 py-3 rounded-xl
              cursor-pointer transition
            "
          >
            <FaChartPie />
            Analytics
          </li>

          <li
            className="
              flex items-center gap-3
              hover:bg-gray-800
              px-4 py-3 rounded-xl
              cursor-pointer transition
            "
          >
            <FaCog />
            Settings
          </li>

        </ul>

      </div>

      <div className="text-sm text-gray-500">
        Smart Finance Tracker
      </div>

    </div>
  );
}

export default Sidebar;