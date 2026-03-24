import { useMemo } from "react";

export const useTransactions = (
  transactions,
  search,
  category,
  type,
  startDate,
  endDate,
  sortBy
) => {
  return useMemo(() => {
    return transactions
      .filter((tx) => {
        const query = search.toLowerCase();

        const matchesSearch =
          tx.title?.toLowerCase().includes(query) ||
          tx.notes?.toLowerCase().includes(query);

        const matchesCategory = category ? tx.category === category : true;
        const matchesType = type ? tx.type === type : true;

        const txDate = tx.date ? new Date(tx.date) : null;

        const matchesStart = startDate
          ? txDate && txDate >= new Date(startDate)
          : true;

        const matchesEnd = endDate
          ? txDate && txDate <= new Date(endDate)
          : true;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesType &&
          matchesStart &&
          matchesEnd
        );
      })
      .sort((a, b) => {
        if (sortBy === "amount") return b.amount - a.amount;
        if (sortBy === "date") return new Date(b.date) - new Date(a.date);
        if (sortBy === "category")
          return a.category.localeCompare(b.category);
        return 0;
      });
  }, [transactions, search, category, type, startDate, endDate, sortBy]);
};