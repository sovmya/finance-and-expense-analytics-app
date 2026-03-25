import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { formatCurrency } from "../utils/currencyFormatter";

const TransactionCard = ({ tx }) => {
  const { deleteTransaction } = useContext(FinanceContext);

  return (
    <div className="tx-card">
      {/* LEFT */}
      <div className="tx-left">
        <h3>{tx.title}</h3>
        <p className="tx-category">{tx.category}</p>
        {tx.recurring && <span className="tx-badge">Recurring</span>}
      </div>

      {/* CENTER */}
      <div className="tx-middle">
        <p>{tx.notes || "—"}</p>
        <p className="tx-date">
          {tx.date
            ? new Date(tx.date).toLocaleDateString()
            : "No date"}
        </p>
      </div>

      {/* RIGHT */}
      <div className="tx-right">
        <p
          className={`tx-amount ${
            tx.type === "income" ? "income" : "expense"
          }`}
        >
          {formatCurrency(tx.amount)}
        </p>

        <button onClick={() => deleteTransaction(tx.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;