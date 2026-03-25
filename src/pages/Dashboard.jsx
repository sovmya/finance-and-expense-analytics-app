import { useContext, useEffect, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
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

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getExchangeRates();
        setRates(data.rates);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRates();
  }, []);

  // Top category
  const categoryMap = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
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
        <p>No transactions yet. Add some to see insights.</p>
      )}

      {/* 🔥 NEW LAYOUT */}
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
              <p>
                {isOverBudget ? "⚠️ Over Budget" : "✅ Within Budget"}
              </p>
            </div>

            <div className="card budget-used">
              <h3>Used</h3>
              <p>{percentUsed}%</p>
            </div>

            <div className="card currency">
              <h3>Rates</h3>

              {!rates ? (
                <p>Loading...</p>
              ) : (
                <div>
                  <p>₹1 = ${rates.USD}</p>
                  <p>₹1 = €{rates.EUR}</p>
                  <p>₹1 = £{rates.GBP}</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT BIG CHART */}
          <div className="card overview">
            <h3>Overview</h3>
            <PieChart width={300} height={300}>
              <Pie data={data} dataKey="value" outerRadius={90}>
                <Cell fill="#4caf50" />
                <Cell fill="#f44336" />
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;