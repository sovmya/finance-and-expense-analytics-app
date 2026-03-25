import { useContext, useEffect, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getExchangeRates } from "../services/api";
import { useBudget } from "../hooks/useBudget";
import { formatCurrency } from "../utils/currencyFormatter";

const Dashboard = () => {
  const { transactions, budget } = useContext(FinanceContext);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const { totalExpense, remaining } = useBudget(transactions, budget);

  const data =
    income === 0 && totalExpense === 0
      ? [{ name: "No Data", value: 1 }]
      : [
          { name: "Income", value: income },
          { name: "Expense", value: totalExpense }
        ];

  const [rates, setRates] = useState(null);
  const [ratesError, setRatesError] = useState(false);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getExchangeRates();
        // API returns rates FROM INR, so rates.USD means ₹1 = x USD
        setRates(data.rates);
      } catch (err) {
        console.error("Failed to fetch exchange rates:", err);
        setRatesError(true);
      }
    };
    fetchRates();
  }, []);

  // Top spending category
  const categoryMap = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });

  let topCategory = "N/A";
  let maxAmount = 0;
  for (let cat in categoryMap) {
    if (categoryMap[cat] > maxAmount) {
      maxAmount = categoryMap[cat];
      topCategory = cat;
    }
  }

  const isOverBudget = totalExpense > budget;

  const percentUsed =
    budget && totalExpense
      ? ((totalExpense / budget) * 100).toFixed(1)
      : 0;

  return (
    <div>
      <h2>Dashboard</h2>

      {transactions.length === 0 && (
        <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
          No transactions yet. Add some to see insights.
        </p>
      )}

      <div className="dashboard">

        {/* TOP ROW */}
        <div className="top-row">
          <div className="card income">
            <h3>Income</h3>
            <p>{formatCurrency(income)}</p>
          </div>
          <div className="card expense">
            <h3>Expense</h3>
            <p>{formatCurrency(totalExpense)}</p>
          </div>
          <div className="card budget">
            <h3>Budget</h3>
            <p>{formatCurrency(budget)}</p>
          </div>
          <div className="card balance">
            <h3>Balance</h3>
            <p>{formatCurrency(remaining)}</p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="bottom-section">

          {/* LEFT STACK */}
          <div className="left-cards">
            <div className="card top-category">
              <h3>Top Category</h3>
              <p>{topCategory}</p>
            </div>

            <div className="card budget-status">
              <h3>Status</h3>
              <p>{isOverBudget ? "⚠️ Over Budget" : "✅ Within Budget"}</p>
            </div>

            <div className="card budget-used">
              <h3>Used</h3>
              <p>{percentUsed}%</p>
            </div>

            <div className="card currency">
              <h3>Exchange Rates</h3>
              {ratesError ? (
                <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                  Could not load rates.
                </p>
              ) : !rates ? (
                <p style={{ color: "var(--text-muted)" }}>Loading...</p>
              ) : (
                <div style={{ fontSize: "13px", lineHeight: "1.8" }}>
                  {/* rates are FROM INR — ₹1 = x foreign */}
                  <p>₹1 = ${rates.USD?.toFixed(4)} USD</p>
                  <p>₹1 = €{rates.EUR?.toFixed(4)} EUR</p>
                  <p>₹1 = £{rates.GBP?.toFixed(4)} GBP</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT BIG CHART */}
          <div className="card overview">
            <h3>Overview</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={data} dataKey="value" outerRadius={100}>
                  <Cell fill="#4caf50" />
                  <Cell fill="#f44336" />
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;