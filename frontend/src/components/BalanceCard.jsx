function BalanceCard({
  title,
  amount,
  darkMode,
}) {

  return (
    <div
      className={`
        p-6 rounded-3xl shadow-xl border
        transition duration-300
        hover:scale-[1.02]
        ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-100"
        }
      `}
    >

      <h2 className="text-gray-400 text-lg">
        {title}
      </h2>

      <h1 className="text-5xl font-extrabold mt-6">
        {amount}
      </h1>

      <div className="mt-6">

        <div className="w-full bg-gray-700 rounded-full h-2">

          <div
            className="
              bg-blue-500 h-2 rounded-full
              w-3/4
            "
          ></div>

        </div>

      </div>

    </div>
  );
}

export default BalanceCard;