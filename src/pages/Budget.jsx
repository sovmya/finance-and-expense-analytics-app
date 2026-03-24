import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { useBudget } from "../hooks/useBudget";

const Budget = () => {
  const { transactions, budget, setBudget } = useContext(FinanceContext);
  const [value, setValue] = useState(budget);

  const { totalExpense, remaining } = useBudget(transactions, budget);

  const percent =
    budget && totalExpense
      ? Math.min((totalExpense / budget) * 100, 100)
      : 0;

  return (
    <div className="card">
      <h2>Budget</h2>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />

      <button onClick={() => setBudget(value)}>Set Budget</button>

      <p><strong>Budget:</strong> ₹{budget}</p>
      <p><strong>Spent:</strong> ₹{totalExpense}</p>
      <p><strong>Remaining:</strong> ₹{remaining}</p>
      <p><strong>Used:</strong> {percent.toFixed(1)}%</p>

      {/* ✅ Progress Bar */}
      <div
        style={{
          background: "#ddd",
          height: "12px",
          borderRadius: "10px",
          marginTop: "10px"
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            borderRadius: "10px",
            background:
              percent > 90 ? "red" : percent > 70 ? "orange" : "green"
          }}
        />
      </div>
    </div>
  );
};

export default Budget;