function SearchFilter({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  darkMode,
}) {

  return (
    <div
      className={`
        p-4 rounded-3xl shadow mb-6
        flex flex-col md:flex-row gap-4
        ${
          darkMode
            ? "bg-gray-800 text-white"
            : "bg-white"
        }
      `}
    >

      <input
        type="text"
        placeholder="Search expenses..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="flex-1 border p-3 rounded-xl"
      />

      <select
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(e.target.value)
        }
        className="border p-3 rounded-xl"
      >

        <option value="All">All Categories</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>

      </select>

    </div>
  );
}

export default SearchFilter;