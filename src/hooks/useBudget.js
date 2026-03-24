export const useBudget = (transactions, budget) => {
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const remaining = budget - totalExpense;

  return {
    totalExpense,
    remaining
  };
};