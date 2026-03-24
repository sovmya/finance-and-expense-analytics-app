const Filters = ({
  category,
  setCategory,
  type,
  setType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  sortBy,
  setSortBy
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginBottom: "20px"
      }}
    >
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Rent">Rent</option>
        <option value="Shopping">Shopping</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Health">Health</option>
        <option value="Utilities">Utilities</option>
        <option value="Subscriptions">Subscriptions</option>
      </select>

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All Types</option>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort By</option>
        <option value="date">Date (Newest)</option>
        <option value="amount">Amount (High → Low)</option>
        <option value="category">Category (A-Z)</option>
      </select>
    </div>
  );
};

export default Filters;