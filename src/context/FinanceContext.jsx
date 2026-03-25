import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("transactions");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [budget, setBudget] = useState(() => {
    try {
      const saved = localStorage.getItem("budget");
      return saved ? JSON.parse(saved) : 50000;
    } catch {
      return 50000;
    }
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  const addTransaction = (data) => {
    setTransactions((prev) => [...prev, { ...data, id: uuidv4() }]);
    toast.success("Transaction added!");
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    toast.info("Transaction deleted.");
  };

  const updateTransaction = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === updatedTx.id ? updatedTx : tx))
    );
    toast.success("Transaction updated!");
  };

  const updateBudget = (value) => {
    setBudget(value);
    toast.success("Budget updated!");
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        budget,
        setBudget: updateBudget
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};