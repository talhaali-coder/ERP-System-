
import {
  BookOpen,
  LayoutDashboard,
  ShoppingCart,
  ShoppingBag,
  Boxes,
  Wallet,
  ChartNoAxesCombined,
  Settings,
  Search,
  Bell,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Download,
  Menu,
  X,
  TrendingUp,
  Package,
  Clock,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useState } from "react";
import "./App.css";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Sales", icon: ShoppingCart },
  { label: "Purchases", icon: ShoppingBag },
  { label: "Inventory", icon: Boxes },
  { label: "Accounts", icon: Wallet },
  { label: "Reports", icon: ChartNoAxesCombined },
];

const salesData = [
  { month: "Jan", sales: 42000, purchases: 28000 },
  { month: "Feb", sales: 51000, purchases: 34000 },
  { month: "Mar", sales: 46000, purchases: 31000 },
  { month: "Apr", sales: 65000, purchases: 39000 },
  { month: "May", sales: 58000, purchases: 36000 },
  { month: "Jun", sales: 76000, purchases: 44000 },
  { month: "Jul", sales: 69000, purchases: 41000 },
  { month: "Aug", sales: 88000, purchases: 49000 },
  { month: "Sep", sales: 79000, purchases: 45000 },
  { month: "Oct", sales: 96000, purchases: 52000 },
  { month: "Nov", sales: 91000, purchases: 50000 },
  { month: "Dec", sales: 112000, purchases: 59000 },
];

const transactions = [
  { id: "INV-1048", customer: "Ahmed Traders", date: "20 Oct 2026", amount: 28500, status: "Paid" },
  { id: "INV-1047", customer: "Al Noor Store", date: "19 Oct 2026", amount: 18750, status: "Pending" },
  { id: "INV-1046", customer: "City Mart", date: "18 Oct 2026", amount: 42300, status: "Paid" },
  { id: "INV-1045", customer: "Hassan Enterprises", date: "17 Oct 2026", amount: 12600, status: "Overdue" },
];


const products = [
  {
    name: "Premium Rice",
    category: "Grocery",
    sold: 248,
    stock: 84,
    minStock: 20,
  },
  {
    name: "Cooking Oil",
    category: "Essentials",
    sold: 196,
    stock: 14,
    minStock: 20,
  },
  {
    name: "Sugar 5kg",
    category: "Grocery",
    sold: 174,
    stock: 5,
    minStock: 20,
  },
  {
    name: "Tea Pack 500g",
    category: "Beverages",
    sold: 132,
    stock: 8,
    minStock: 15,
  },
];



const inventoryAlerts = products
  .filter((product) => product.stock <= product.minStock)
  .map((product) => ({
    name: product.name,
    stock:
      product.stock === 0
        ? "Out of stock"
        : `${product.stock} units left`,
    level:
      product.stock === 0
        ? "Out of stock"
        : product.stock <= product.minStock / 2
          ? "Critical"
          : "Low",
    reorderQuantity: Math.max(
      0,
      product.minStock * 2 - product.stock
    ),
  }));


const formatPKR = (amount) =>
  "Rs. " + amount.toLocaleString("en-PK");

function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && (
        <button
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <BookOpen size={29} strokeWidth={1.8} />
          </div>
          <div className="brand-copy">
            <h2>Meezan</h2>
            <span>ERP SYSTEM</span>
          </div>
          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="nav-caption">WORKSPACE</div>

        <nav className="navigation">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${active === label ? "active" : ""}`}
              onClick={() => {
                setActive(label);
                setMobileOpen(false);
              }}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
              {label === "Inventory" && <span className="nav-count">3</span>}
            </button>
          ))}
        </nav>

        <div className="nav-caption management-caption">MANAGEMENT</div>

        <button
          className={`nav-item ${active === "Settings" ? "active" : ""}`}
          onClick={() => {
            setActive("Settings");
            setMobileOpen(false);
          }}
        >
          <Settings size={19} strokeWidth={1.8} />
          <span>Settings</span>
        </button>

        <div className="sidebar-bottom">
          <div className="ai-card">
            <div className="ai-icon"><Sparkles size={18} /></div>
            <strong>Meezan Intelligence</strong>
            <p>Your AI business assistant is coming soon.</p>
            <button onClick={() => setActive("AI Assistant")}>
              Explore AI <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="sidebar-footer">
            <span className="footer-dot" />
            <span>Business workspace</span>
            <span className="version">v1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}

function MetricCard({ title, amount, change, positive, icon: Icon, note }) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span className="metric-label">{title}</span>
        <div className="metric-icon"><Icon size={20} /></div>
      </div>

      <div className="metric-value">{amount}</div>

      <div className="metric-bottom">
        <span className={`metric-change ${positive ? "positive" : "negative"}`}>
          {positive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
          {change}
        </span>
        <span className="metric-note">{note}</span>
      </div>
    </article>
  );
}

function Dashboard() {
  return (
    <>
      <section className="welcome-banner">
        <div className="welcome-content">
          <span className="welcome-eyebrow">YOUR BUSINESS AT A GLANCE</span>
          <h2>Good afternoon, Talha <span>✦</span></h2>
          <p>Here’s what’s happening with your business today.</p>
          <div className="welcome-date"><Clock size={15} /> Tuesday, 20 October 2026</div>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <div className="art-circle art-circle-one" />
          <div className="art-circle art-circle-two" />
          <div className="art-book"><BookOpen size={92} strokeWidth={1.1} /></div>
          <div className="art-leaf">✳</div>
        </div>
      </section>

      <section className="metrics-grid">
        <MetricCard title="Total Sales" amount="Rs. 125,400" change="12.8%" positive icon={ShoppingCart} note="vs. last month" />
        <MetricCard title="Total Purchases" amount="Rs. 98,750" change="8.2%" positive icon={ShoppingBag} note="vs. last month" />
        <MetricCard title="Stock Value" amount="Rs. 245,600" change="5.4%" positive icon={Boxes} note="vs. last month" />
        <MetricCard title="Net Profit" amount="Rs. 26,650" change="15.3%" positive icon={TrendingUp} note="vs. last month" />
      </section>

      <section className="main-grid">
        <article className="panel sales-panel">
          <div className="panel-heading">
            <div>
              <h3>Sales overview</h3>
              <p>Track your sales and purchases over time</p>
            </div>
            <select className="period-select" defaultValue="year" aria-label="Chart period">
              <option value="year">This year</option>
              <option value="month">This month</option>
            </select>
          </div>

          <div className="chart-summary">
            <div>
              <span className="chart-summary-label">Total revenue</span>
              <strong>Rs. 8.43M</strong>
            </div>
            <span className="chart-summary-change"><ArrowUpRight size={15} /> 12.8%</span>
          </div>

          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 12, right: 8, left: -14, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#235347" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#235347" stopOpacity={0.01} />
                  </linearGradient>
                  <linearGradient id="purchaseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8EB69B" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#8EB69B" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e9efea" vertical={false} strokeDasharray="4 4" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#839188", fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#839188", fontSize: 11 }} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip
                  formatter={(value) => formatPKR(value)}
                  contentStyle={{ borderRadius: 12, border: "1px solid #e5ebe5", fontSize: 12 }}
                />
                <Area type="monotone" dataKey="sales" name="Sales" stroke="#235347" strokeWidth={2.5} fill="url(#salesGradient)" activeDot={{ r: 5 }} />
                <Area type="monotone" dataKey="purchases" name="Purchases" stroke="#8EB69B" strokeWidth={2.2} fill="url(#purchaseGradient)" activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-legend">
            <span><i className="legend-dot sales-dot" /> Sales</span>
            <span><i className="legend-dot purchases-dot" /> Purchases</span>
          </div>
        </article>

        <article className="panel transactions-panel">
          <div className="panel-heading">
            <div>
              <h3>Recent transactions</h3>
              <p>Your latest sales invoices</p>
            </div>
            <button className="text-button" onClick={() => window.alert("Transactions page will be connected to the backend later.")}>View all <ArrowUpRight size={15} /></button>
          </div>

          <div className="transaction-list">
            {transactions.map((item) => (
              <div className="transaction-row" key={item.id}>
                <div className="transaction-avatar"><ShoppingBag size={18} /></div>
                <div className="transaction-info">
                  <strong>{item.customer}</strong>
                  <span>{item.id} · {item.date}</span>
                </div>
                <div className="transaction-amount">
                  <strong>{formatPKR(item.amount)}</strong>
                  <span className={`status status-${item.status.toLowerCase()}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="outline-button" onClick={() => window.alert("Create invoice will be connected to the backend later.")}>
            <Plus size={16} /> Create new invoice
          </button>
        </article>
      </section>

      <section className="bottom-grid">
        <article className="panel products-panel">
          <div className="panel-heading">
            <div>
              <h3>Top-selling products</h3>
              <p>Your best performers this month</p>
            </div>
            <button className="icon-button" aria-label="Export products" onClick={() => window.alert("Product export will be available when the backend is connected.")}><Download size={17} /></button>
          </div>

          
<div className="table-scroll">
  <table>
    <thead>
      <tr>
        <th>PRODUCT</th>
        <th>SOLD</th>
        <th>STOCK</th>
        <th>STATUS</th>
      </tr>
    </thead>

    <tbody>
      {products.map((product) => (
        <tr key={product.name}>
          <td>
            <div className="product-cell">
              <div className="product-avatar">
                <Package size={18} />
              </div>

              <div>
                <strong>{product.name}</strong>
                <span>{product.category}</span>
              </div>
            </div>
          </td>

          <td>{product.sold}</td>

          <td>{product.stock}</td>

          <td>
            <span
              className={`stock-status ${
                product.stock === 0
                  ? "stock-low"
                  : product.stock <= product.minStock
                    ? "stock-low"
                    : "stock-good"
              }`}
            >
              {product.stock === 0
                ? "Out of stock"
                : product.stock <= product.minStock
                  ? "Low stock"
                  : "In stock"}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        </article>

        <article className="panel alerts-panel">
          <div className="panel-heading">
            <div>
              <h3>Inventory alerts</h3>
              <p>Items that need your attention</p>
            </div>
            <span className="alert-count">{inventoryAlerts.length}</span>
          </div>

          <div className="alert-list">
            {inventoryAlerts.map((item) => (
              <div className="alert-row" key={item.name}>
                <div className={`alert-icon ${item.level === "Critical" ? "alert-critical" : ""}`}><AlertTriangle size={18} /></div>
                <div className="alert-info"><strong>{item.name}</strong><span>{item.stock}</span></div>
                <span className={`alert-level ${item.level.toLowerCase()}`}>{item.level}</span>
              </div>
            ))}
          </div>

          <button className="outline-button alert-action" onClick={() => window.alert("Inventory management will be connected to MongoDB later.")}>
            Manage inventory <ArrowUpRight size={15} />
          </button>
        </article>
      </section>

      <footer className="dashboard-footer">
        <span>© 2026 Meezan ERP</span>
        <span>Built for smarter business management</span>
      </footer>
    </>
  );
}

function PlaceholderPage({ title }) {
  return (
    <section className="placeholder-panel">
      <div className="placeholder-icon"><Boxes size={30} /></div>
      <h2>{title}</h2>
      <p>This section is part of Meezan ERP. Its forms, records, and database integration will be built in the next stages.</p>
    </section>
  );
}

function App() {
  const [active, setActive] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="app-shell">
      <Sidebar
        active={active}
        setActive={setActive}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={22} /></button>
            <div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-slash">/</span><strong>{active}</strong></div>
          </div>

          <div className="topbar-actions">
            <label className="search-box">
              <Search size={18} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search anything..."
                aria-label="Search dashboard"
              />
              <kbd>⌘ K</kbd>
            </label>
            <button className="notification-button" aria-label="Notifications" onClick={() => window.alert("You have 3 inventory alerts in this demo.")}>
              <Bell size={19} /><span />
            </button>
            <div className="topbar-divider" />
            <button className="profile-button" onClick={() => window.alert("Profile settings will be added later.")}>
              <div className="profile-avatar">T</div>
              <div className="profile-info"><strong>Talha</strong><span>Administrator</span></div>
              <ChevronDown size={16} className="profile-chevron" />
            </button>
          </div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div>
              <span className="page-eyebrow">MEEZAN ERP / BUSINESS OVERVIEW</span>
              <h1>{active === "Dashboard" ? "Dashboard" : active}</h1>
              <p>Manage your business with clarity and confidence.</p>
            </div>
            <button className="primary-button" onClick={() => window.alert("New record forms will be added when we build the backend.")}>
              <Plus size={17} /> Create new
            </button>
          </div>

          {active === "Dashboard" ? (
            <Dashboard />
          ) : (
            <PlaceholderPage title={active === "AI Assistant" ? "Meezan AI Assistant" : active} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
