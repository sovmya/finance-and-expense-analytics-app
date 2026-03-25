// useCurrency: returns a formatted INR string for a given amount.
// Usage: const formatted = useCurrency(amount)
// Note: For most cases, prefer the formatCurrency util from currencyFormatter.js.
// This hook exists for components that want to consume currency formatting via hooks pattern.

import { useMemo } from "react";

export const useCurrency = (amount) => {
  return useMemo(() => {
    if (amount === undefined || amount === null) return "₹0";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);
  }, [amount]);
};