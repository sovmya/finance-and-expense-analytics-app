import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Legend,
  CartesianGrid
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"];

const Analytics = () => {
  const { transactions, budget } = useContext(FinanceContext);

  // 🟣 1. Spending by Category (Pie)
  const categoryMap = {};

  transactions
    .filter((tx) => tx.type === "expense")
    .forEach((tx) => {
      categoryMap[tx.category] =
        (categoryMap[tx.category] || 0) + tx.amount;
    });

  const categoryData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key]
  }));

  // 🔵 2. Monthly Data (Line + Bar + Budget)
  const monthlyMap = {};

  transactions.forEach((tx) => {
    if (!tx.date) return;

    const month = new Date(tx.date).toLocaleString("default", {
      month: "short"
    });

    if (!monthlyMap[month]) {
      monthlyMap[month] = {
        month,
        income: 0,
        expense: 0
      };
    }

    if (tx.type === "income") {
      monthlyMap[month].income += tx.amount;
    } else {
      monthlyMap[month].expense += tx.amount;
    }
  });

  const monthlyData = Object.values(monthlyMap).map((m) => ({
    ...m,
    budget: budget,
    balance: m.income - m.expense
  }));

  return (
    <div>
      <h2>Analytics</h2>

      {/* 🟣 PIE CHART */}
      <div className="card">
        <h3>Spending by Category</h3>
        <PieChart width={350} height={300}>
          <Pie
            data={categoryData}
            dataKey="value"
            outerRadius={100}
            label
          >
            {categoryData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* 🔵 LINE CHART */}
      <div className="card">
        <h3>Monthly Spending Trend</h3>
        <LineChart width={400} height={300} data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="expense" stroke="#ff4d4f" />
        </LineChart>
      </div>

      {/* 🟢 BAR CHART */}
      <div className="card">
        <h3>Income vs Expense</h3>
        <BarChart width={400} height={300} data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#4caf50" />
          <Bar dataKey="expense" fill="#f44336" />
        </BarChart>
      </div>

      {/* 🟡 BUDGET VS SPENDING */}
      <div className="card">
        <h3>Budget vs Spending</h3>
        <BarChart width={400} height={300} data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" />
          <Bar dataKey="expense" fill="#ff8042" />
        </BarChart>
      </div>
    </div>
  );
};

export default Analytics;