import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

const Budget = () => {
  const { budget, setBudget } = useContext(FinanceContext);
  const [value, setValue] = useState(budget);

  return (
    <div className="card">
      <h2>Budget</h2>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />

      <button onClick={() => setBudget(value)}>
        Set Budget
      </button>

      <p>Current Budget: ₹{budget}</p>
    </div>
  );
};

export default Budget;