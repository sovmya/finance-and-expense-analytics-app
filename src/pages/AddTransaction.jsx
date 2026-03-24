import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FinanceContext } from "../context/FinanceContext";
import { useNavigate, useLocation } from "react-router-dom";

const AddTransaction = () => {
  const { addTransaction, updateTransaction } = useContext(FinanceContext);
  const navigate = useNavigate();
  const location = useLocation();

  const editData = location.state;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: editData || {}
  });

  const onSubmit = (data) => {
    const formatted = {
      ...data,
      amount: Number(data.amount),
      recurring: data.recurring || false
    };

    if (editData) {
      updateTransaction({ ...formatted, id: editData.id });
    } else {
      addTransaction(formatted);
    }

    reset();
    navigate("/transactions");
  };

  return (
    <div className="card">
      <h2>{editData ? "Edit Transaction" : "Add Transaction"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input placeholder="Title" {...register("title")} />

        <input
          type="number"
          placeholder="Amount"
          {...register("amount")}
        />

        <select {...register("category")}>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Rent">Rent</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Utilities">Utilities</option>
          <option value="Subscriptions">Subscriptions</option>
        </select>

        <select {...register("type")}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input type="date" {...register("date")} />

        <textarea placeholder="Notes" {...register("notes")} />

        <label>
          <input type="checkbox" {...register("recurring")} />
          Recurring
        </label>

        <button type="submit">
          {editData ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;