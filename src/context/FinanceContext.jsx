import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  // ✅ LOAD FROM LOCAL STORAGE
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem("budget");
    return saved ? JSON.parse(saved) : 50000;
  });

  // ✅ SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  const addTransaction = (data) => {
    setTransactions((prev) => [
      ...prev,
      { ...data, id: uuidv4() }
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((tx) => tx.id !== id)
    );
  };

  const updateTransaction = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === updatedTx.id ? updatedTx : tx
      )
    );
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        budget,
        setBudget
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};