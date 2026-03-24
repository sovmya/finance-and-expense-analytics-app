import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import { formatCurrency } from "../utils/currencyFormatter";

const Transactions = () => {
  const { transactions, deleteTransaction } = useContext(FinanceContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filteredTransactions = transactions
    .filter((tx) => {
      const query = search.toLowerCase();

      const matchesSearch =
        tx.title?.toLowerCase().includes(query) ||
        tx.notes?.toLowerCase().includes(query);

      const matchesCategory = category ? tx.category === category : true;
      const matchesType = type ? tx.type === type : true;

      const txDate = tx.date ? new Date(tx.date) : null;

      const matchesStart = startDate
        ? txDate && txDate >= new Date(startDate)
        : true;

      const matchesEnd = endDate
        ? txDate && txDate <= new Date(endDate)
        : true;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType &&
        matchesStart &&
        matchesEnd
      );
    })
    .sort((a, b) => {
      if (sortBy === "amount") return b.amount - a.amount;
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      if (sortBy === "category")
        return a.category.localeCompare(b.category);
      return 0;
    });

  return (
    <div>
      <h2>Transactions</h2>

      {/* 🔍 SEARCH */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* 🎯 FILTERS */}
      <Filters
        category={category}
        setCategory={setCategory}
        type={type}
        setType={setType}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* 📋 LIST */}
      {filteredTransactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        filteredTransactions.map((tx) => (
          <div key={tx.id} className="card">
            <h3>{tx.title}</h3>

            <p><strong>Amount:</strong> {formatCurrency(tx.amount)}</p>
            <p><strong>Category:</strong> {tx.category}</p>
            <p><strong>Type:</strong> {tx.type}</p>

            <p>
              <strong>Date:</strong>{" "}
              {tx.date
                ? new Date(tx.date).toLocaleDateString()
                : "N/A"}
            </p>

            <p><strong>Notes:</strong> {tx.notes}</p>

            {tx.recurring && <p>🔁 Recurring</p>}

            <button onClick={() => deleteTransaction(tx.id)}>
              Delete
            </button>

            <button
              onClick={() =>
                navigate("/transactions/new", { state: tx })
              }
            >
              Edit
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Transactions;