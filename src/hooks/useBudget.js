export const useBudget = (transactions, budget) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyExpenses = transactions
    .filter((t) => {
      if (t.type !== "expense" || !t.date) return false;

      const txDate = new Date(t.date);

      return (
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const remaining = budget - monthlyExpenses;

  return {
    totalExpense: monthlyExpenses,
    remaining
  };
};