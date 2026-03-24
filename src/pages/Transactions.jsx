import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import TransactionCard from "../components/TransactionCard";
import { useTransactions } from "../hooks/useTransactions";
import { useDebounce } from "../hooks/useDebounce";

const Transactions = () => {
  const { transactions } = useContext(FinanceContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("");

  // ✅ debounce search
  const debouncedSearch = useDebounce(search, 300);

  // ✅ use custom hook
  const filteredTransactions = useTransactions(
    transactions,
    debouncedSearch,
    category,
    type,
    startDate,
    endDate,
    sortBy
  );

  return (
    <div>
      <h2>Transactions</h2>

      <SearchBar search={search} setSearch={setSearch} />

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

      {filteredTransactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        filteredTransactions.map((tx) => (
          <div key={tx.id}>
            <TransactionCard tx={tx} />

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