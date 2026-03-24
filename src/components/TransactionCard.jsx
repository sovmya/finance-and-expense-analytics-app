import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const TransactionCard = ({ tx }) => {
  const { deleteTransaction } = useContext(FinanceContext);

  return (
    <div style={{
      border: "1px solid gray",
      padding: "10px",
      margin: "10px 0"
    }}>
      <h3>{tx.title}</h3>

      <p>₹{tx.amount}</p>
      <p>{tx.category}</p>
      <p>{tx.type}</p>
      <p>{tx.date}</p>
      <p>{tx.notes}</p>

      {tx.recurring && <p>🔁 Recurring</p>}

      <button onClick={() => deleteTransaction(tx.id)}>
        Delete
      </button>
    </div>
  );
};

export default TransactionCard;