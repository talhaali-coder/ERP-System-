
import {
  Sparkles,
  CircleDollarSign,
  ShoppingBag,
  Wallet,
  Boxes,
  CalendarDays,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

import {
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
  Legend,
} from "recharts";

import PageHeader from "../../components/common/PageHeader";
import MetricCard from "../../components/common/MetricCard";
import Panel from "../../components/common/Panel";

const money = (value) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);

const salesTrend = [
  { day: "Mon", sales: 18500, purchases: 12000, expenses: 4500 },
  { day: "Tue", sales: 24200, purchases: 15800, expenses: 5200 },
  { day: "Wed", sales: 19800, purchases: 11000, expenses: 3800 },
  { day: "Thu", sales: 31500, purchases: 22400, expenses: 6700 },
  { day: "Fri", sales: 27800, purchases: 18500, expenses: 5900 },
  { day: "Sat", sales: 38600, purchases: 26000, expenses: 8200 },
  { day: "Sun", sales: 34200, purchases: 21000, expenses: 6100 },
];

function Overview({ products, sales, purchases, expenses, setActivePage }) {
  const lowStock = products.filter(
    (product) => product.stock <= product.minStock
  );

  const salesTotal = sales.reduce((sum, item) => sum + item.amount, 0);
  const purchasesTotal = purchases.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const expenseTotal = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <>
      <PageHeader
        title="Overview"
        subtitle="Welcome back! Here's what's happening in your business today."
        action="Create Invoice"
        onAction={() => setActivePage("Sales & Invoices")}
      />

      <div className="welcome-strip">
        <div className="welcome-icon">
          <Sparkles size={21} />
        </div>

        <div>
          <strong>Your business at a glance</strong>
          <p>
            Review your sales, inventory, and outstanding payments from one
            place.
          </p>
        </div>

        <button
          className="text-button"
          onClick={() => setActivePage("Reports")}
        >
          View reports <ChevronRight size={16} />
        </button>
      </div>

      <div className="metrics-grid">
        <MetricCard
          title="Total Sales"
          value={money(salesTotal)}
          change="+12.8%"
          icon={CircleDollarSign}
          note="Sample invoice data"
        />

        <MetricCard
          title="Total Purchases"
          value={money(purchasesTotal)}
          change="+4.3%"
          icon={ShoppingBag}
          tone="sage"
          note="Sample purchase data"
        />

        <MetricCard
          title="Expenses"
          value={money(expenseTotal)}
          change="-2.4%"
          icon={Wallet}
          tone="gold"
          note="Sample expense data"
        />

        <MetricCard
          title="Low Stock Items"
          value={lowStock.length}
          icon={Boxes}
          tone="red"
          note="Products at or below minimum stock"
        />
      </div>

      <div className="dashboard-grid">
        <Panel
          title="Financial Overview"
          subtitle="Sales, purchases and expenses for the last 7 days"
          className="sales-chart-panel"
          action={
            <button className="select-button">
              <CalendarDays size={15} />
              This week
              <ChevronDown size={14} />
            </button>
          }
        >
          <div className="chart-summary">
            <strong>
              {money(
                salesTrend.reduce((sum, item) => sum + item.sales, 0)
              )}
            </strong>
            <span>Sales this week</span>
          </div>

          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesTrend}
                margin={{ top: 12, right: 12, left: -15, bottom: 0 }}
              >
                <CartesianGrid
                  stroke="#e9eee9"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#85938a", fontSize: 12 }}
                  dy={9}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#85938a", fontSize: 11 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />

                <Tooltip
                  formatter={(value, name) => [money(value), name]}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e1e9e1",
                    fontSize: 12,
                  }}
                />

                <Legend verticalAlign="top" height={36} />

                <Line
                  type="monotone"
                  dataKey="sales"
                  name="Sales"
                  stroke="#235347"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5 }}
                />

                <Line
                  type="monotone"
                  dataKey="purchases"
                  name="Purchases"
                  stroke="#D97706"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />

                <Line
                  type="monotone"
                  dataKey="expenses"
                  name="Expenses"
                  stroke="#DC5555"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </>
  );
}

export default Overview;
