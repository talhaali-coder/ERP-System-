import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Boxes,
  BrainCircuit,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  Download,
  FileBarChart,
  FilePlus2,
  FileText,
  Folder,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  PackageMinus,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Tags,
  Truck,
  Undo2,
  Users,
  UsersRound,
  Wallet,
  X,
  Ruler,
  History,
  ReceiptText,
  ChartNoAxesCombined,
  Layers,
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

import "./App.css";

import StatusBadge from "./components/common/StatusBadge";
import Sidebar from "./components/common/Sidebar";
import PageHeader from "./components/common/PageHeader";
import MetricCard from "./components/common/MetricCard";
import Panel from "./components/common/Panel";
import DataTable from "./components/tables/DataTable";
import { navigation } from "./utils/navigation";


const initialProducts = [
  { id: "PR-001", name: "Premium Rice", category: "Grocery", brand: "Mehran", unit: "Bag", price: 3200, stock: 84, minStock: 20 },
  { id: "CO-002", name: "Cooking Oil", category: "Essentials", brand: "Sufi", unit: "Bottle", price: 680, stock: 14, minStock: 20 },
  { id: "SG-003", name: "Sugar 5kg", category: "Grocery", brand: "Local", unit: "Bag", price: 850, stock: 5, minStock: 20 },
  { id: "TP-004", name: "Tea Pack 500g", category: "Beverages", brand: "Tapal", unit: "Pack", price: 720, stock: 8, minStock: 15 },
  { id: "FL-005", name: "Wheat Flour", category: "Grocery", brand: "Local", unit: "Bag", price: 1450, stock: 56, minStock: 15 },
];

const initialCustomers = [
  { id: "CUS-001", name: "Ahmed Traders", phone: "0300-1234567", email: "ahmed@example.com", balance: 18500 },
  { id: "CUS-002", name: "City Mart", phone: "0312-1234567", email: "city@example.com", balance: 7200 },
  { id: "CUS-003", name: "Usman Store", phone: "0333-1234567", email: "usman@example.com", balance: 0 },
];

const initialSuppliers = [
  { id: "SUP-001", name: "Mehran Distributors", phone: "0301-5551111", email: "sales@mehran.example", balance: 25000 },
  { id: "SUP-002", name: "Sufi Wholesale", phone: "0302-5552222", email: "orders@sufi.example", balance: 12000 },
  { id: "SUP-003", name: "City Supply Co.", phone: "0303-5553333", email: "info@citysupply.example", balance: 0 },
];

const initialSales = [
  { id: "INV-1001", party: "Ahmed Traders", date: "2026-10-20", amount: 24500, status: "Paid" },
  { id: "INV-1002", party: "City Mart", date: "2026-10-19", amount: 18700, status: "Partial" },
  { id: "INV-1003", party: "Usman Store", date: "2026-10-18", amount: 9600, status: "Unpaid" },
  { id: "INV-1004", party: "Ahmed Traders", date: "2026-10-17", amount: 31200, status: "Paid" },
];

const initialPurchases = [
  { id: "PUR-2001", party: "Mehran Distributors", date: "2026-10-20", amount: 38000, status: "Received" },
  { id: "PUR-2002", party: "Sufi Wholesale", date: "2026-10-18", amount: 22500, status: "Pending" },
  { id: "PUR-2003", party: "City Supply Co.", date: "2026-10-16", amount: 14200, status: "Received" },
];

const initialExpenses = [
  { id: "EXP-001", name: "Shop Rent", category: "Rent", date: "2026-10-05", amount: 25000, status: "Paid" },
  { id: "EXP-002", name: "Electricity Bill", category: "Utilities", date: "2026-10-10", amount: 8500, status: "Paid" },
  { id: "EXP-003", name: "Delivery Charges", category: "Transport", date: "2026-10-15", amount: 3200, status: "Pending" },
];


const salesTrend = [
  { day: "Mon", sales: 18500, purchases: 12000, expenses: 4500 },
  { day: "Tue", sales: 24200, purchases: 15800, expenses: 5200 },
  { day: "Wed", sales: 19800, purchases: 11000, expenses: 3800 },
  { day: "Thu", sales: 31500, purchases: 22400, expenses: 6700 },
  { day: "Fri", sales: 27800, purchases: 18500, expenses: 5900 },
  { day: "Sat", sales: 38600, purchases: 26000, expenses: 8200 },
  { day: "Sun", sales: 34200, purchases: 21000, expenses: 6100 },
];


const money = (value) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}











function Overview({ products, sales, purchases, expenses, setActivePage }) {
  const lowStock = products.filter((product) => product.stock <= product.minStock);
  const salesTotal = sales.reduce((sum, item) => sum + item.amount, 0);
  const purchasesTotal = purchases.reduce((sum, item) => sum + item.amount, 0);
  const expenseTotal = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <>
      <PageHeader title="Overview" subtitle="Welcome back! Here's what's happening in your business today." action="Create Invoice" onAction={() => setActivePage("Sales & Invoices")} />
      <div className="welcome-strip">
        <div className="welcome-icon"><Sparkles size={21} /></div>
        <div><strong>Your business at a glance</strong><p>Review your sales, inventory, and outstanding payments from one place.</p></div>
        <button className="text-button" onClick={() => setActivePage("Reports")}>View reports <ChevronRight size={16} /></button>
      </div>
      <div className="metrics-grid">
        <MetricCard title="Total Sales" value={money(salesTotal)} change="+12.8%" icon={CircleDollarSign} note="Sample invoice data" />
        <MetricCard title="Total Purchases" value={money(purchasesTotal)} change="+4.3%" icon={ShoppingBag} tone="sage" note="Sample purchase data" />
        <MetricCard title="Expenses" value={money(expenseTotal)} change="-2.4%" icon={Wallet} tone="gold" note="Sample expense data" />
        <MetricCard title="Low Stock Items" value={lowStock.length} icon={Boxes} tone="red" note="Products at or below minimum stock" />
      </div>

      <div className="dashboard-grid">
        
<Panel
  title="Financial Overview"
  subtitle="Sales, purchases and expenses for the last 7 days"
  className="sales-chart-panel"
  action={
    <button className="select-button">
      <CalendarDays size={15} /> This week <ChevronDown size={14} />
    </button>
  }
>
  <div className="chart-summary">
    <strong>
      {money(salesTrend.reduce((sum, item) => sum + item.sales, 0))}
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

function RecordsPage({ page, products, setProducts, customers, setCustomers, suppliers, setSuppliers, sales, setSales, purchases, setPurchases, expenses, setExpenses, setActivePage, setModal }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const config = useMemo(() => {
    const stockColumns = [
      { key: "id", label: "SKU" },
      { key: "name", label: "PRODUCT", render: (value, row) => <div className="table-product"><div className="product-avatar">{getInitials(value)}</div><div><strong>{value}</strong><span>{row.brand}</span></div></div> },
      { key: "category", label: "CATEGORY" },
      { key: "price", label: "PRICE", render: (value) => money(value) },
      { key: "stock", label: "STOCK" },
      { key: "status", label: "STATUS", render: (_, row) => <StatusBadge status={row.stock === 0 ? "Out of stock" : row.stock <= row.minStock ? "Low stock" : "In stock"} /> },
    ];
    const invoiceColumns = [
      { key: "id", label: "REFERENCE" },
      { key: "party", label: "CUSTOMER / SUPPLIER" },
      { key: "date", label: "DATE" },
      { key: "amount", label: "AMOUNT", render: (value) => money(value) },
      { key: "status", label: "STATUS", render: (value) => <StatusBadge status={value} /> },
    ];
    const partyColumns = [
      { key: "id", label: "ID" },
      { key: "name", label: "NAME", render: (value, row) => <div className="table-product"><div className="product-avatar">{getInitials(value)}</div><div><strong>{value}</strong><span>{row.email}</span></div></div> },
      { key: "phone", label: "PHONE" },
      { key: "balance", label: "BALANCE", render: (value) => <strong>{money(value)}</strong> },
      { key: "status", label: "STATUS", render: () => <StatusBadge status="Active" /> },
    ];
    const expenseColumns = [
      { key: "id", label: "REFERENCE" },
      { key: "name", label: "EXPENSE" },
      { key: "category", label: "CATEGORY" },
      { key: "date", label: "DATE" },
      { key: "amount", label: "AMOUNT", render: (value) => money(value) },
      { key: "status", label: "STATUS", render: (value) => <StatusBadge status={value} /> },
    ];
    const inventory = products.map((product) => ({ ...product, status: product.stock <= product.minStock ? "Low stock" : "In stock" }));

    const map = {
      Products: { subtitle: "Manage your product catalogue, prices, and stock levels.", action: "Add Product", rows: inventory, columns: stockColumns, addType: "product" },
      "Stock Overview": { subtitle: "Monitor stock quantities and identify items that need restocking.", rows: inventory, columns: stockColumns },
      Customers: { subtitle: "Manage customer profiles and outstanding balances.", action: "Add Customer", rows: customers, columns: partyColumns, addType: "customer" },
      Suppliers: { subtitle: "Manage suppliers, contact information, and outstanding balances.", action: "Add Supplier", rows: suppliers, columns: partyColumns, addType: "supplier" },
      "Sales & Invoices": { subtitle: "Create invoices and track customer payments.", action: "Create Invoice", rows: sales, columns: invoiceColumns, addType: "sale" },
      Purchases: { subtitle: "Track supplier purchases and incoming inventory.", action: "Add Purchase", rows: purchases, columns: invoiceColumns, addType: "purchase" },
      Expenses: { subtitle: "Record and review business operating expenses.", action: "Add Expense", rows: expenses, columns: expenseColumns, addType: "expense" },
      "Sales Returns": { subtitle: "Track returned goods from customer sales.", rows: [], columns: invoiceColumns },
      "Purchase Returns": { subtitle: "Track goods returned to suppliers.", rows: [], columns: invoiceColumns },
      Payments: { subtitle: "Review payment activity and transaction records.", rows: [...sales.map((item) => ({ ...item, party: `${item.party} · Invoice` })), ...purchases.map((item) => ({ ...item, party: `${item.party} · Purchase` }))], columns: invoiceColumns },
      Categories: { subtitle: "Organize products into meaningful categories.", action: "Add Category", rows: [...new Set(products.map((item) => item.category))].map((name, i) => ({ id: `CAT-${i + 1}`, name, count: products.filter((p) => p.category === name).length, status: "Active" })), columns: [{ key: "id", label: "ID" }, { key: "name", label: "CATEGORY" }, { key: "count", label: "PRODUCTS" }, { key: "status", label: "STATUS", render: (value) => <StatusBadge status={value} /> }], addType: "category" },
      Brands: { subtitle: "Manage the brands associated with your products.", action: "Add Brand", rows: [...new Set(products.map((item) => item.brand))].map((name, i) => ({ id: `BR-${i + 1}`, name, status: "Active" })), columns: [{ key: "id", label: "ID" }, { key: "name", label: "BRAND" }, { key: "status", label: "STATUS", render: (value) => <StatusBadge status={value} /> }], addType: "brand" },
      Units: { subtitle: "Manage measurement units used for your products.", action: "Add Unit", rows: [...new Set(products.map((item) => item.unit))].map((name, i) => ({ id: `UNIT-${i + 1}`, name, status: "Active" })), columns: [{ key: "id", label: "ID" }, { key: "name", label: "UNIT" }, { key: "status", label: "STATUS", render: (value) => <StatusBadge status={value} /> }], addType: "unit" },
      "Expense Categories": { subtitle: "Organize expenses to improve financial reporting.", action: "Add Category", rows: [...new Set(expenses.map((item) => item.category))].map((name, i) => ({ id: `EC-${i + 1}`, name, status: "Active" })), columns: [{ key: "id", label: "ID" }, { key: "name", label: "CATEGORY" }, { key: "status", label: "STATUS", render: (value) => <StatusBadge status={value} /> }], addType: "expense-category" },
      "Team & Permissions": { subtitle: "Review team members and their access.", action: "Invite Member", rows: [{ id: "USR-001", name: "Administrator", email: "admin@example.com", role: "Administrator", status: "Active" }], columns: [{ key: "id", label: "ID" }, { key: "name", label: "TEAM MEMBER" }, { key: "email", label: "EMAIL" }, { key: "role", label: "ROLE" }, { key: "status", label: "STATUS", render: (value) => <StatusBadge status={value} /> }], addType: "team" },
      Roles: { subtitle: "Manage the roles that define system access.", action: "Add Role", rows: [{ id: "ROLE-01", name: "Administrator", permissions: "All permissions", status: "Active" }, { id: "ROLE-02", name: "Sales Staff", permissions: "Sales and customers", status: "Active" }, { id: "ROLE-03", name: "Inventory Manager", permissions: "Products and stock", status: "Active" }], columns: [{ key: "id", label: "ID" }, { key: "name", label: "ROLE" }, { key: "permissions", label: "PERMISSIONS" }, { key: "status", label: "STATUS", render: (value) => <StatusBadge status={value} /> }], addType: "role" },
      "Activity Log": { subtitle: "Review recent activity within the system.", rows: [{ id: "LOG-001", name: "Dashboard viewed", user: "Administrator", date: "2026-10-20 10:30", status: "Completed" }, { id: "LOG-002", name: "Inventory reviewed", user: "Administrator", date: "2026-10-20 10:20", status: "Completed" }], columns: [{ key: "id", label: "REFERENCE" }, { key: "name", label: "ACTIVITY" }, { key: "user", label: "USER" }, { key: "date", label: "DATE & TIME" }, { key: "status", label: "STATUS", render: (value) => <StatusBadge status={value} /> }] },
      Reports: { subtitle: "Explore business performance and financial summaries.", rows: [{ id: "REP-001", name: "Sales Report", description: "Sales totals and invoice status", status: "Available" }, { id: "REP-002", name: "Purchase Report", description: "Purchases by supplier", status: "Available" }, { id: "REP-003", name: "Inventory Report", description: "Current stock and valuation", status: "Available" }, { id: "REP-004", name: "Expense Report", description: "Expenses by category", status: "Available" }], columns: [{ key: "id", label: "ID" }, { key: "name", label: "REPORT" }, { key: "description", label: "DESCRIPTION" }, { key: "status", label: "STATUS", render: (value) => <StatusBadge status={value} /> }] },
    };

    return map[page];
  }, [page, products, customers, suppliers, sales, purchases, expenses]);

  const subtitle = config?.subtitle || "Manage your business information and preferences.";
  const rows = config?.rows || [];
  const columns = config?.columns || [];
  const filteredRows = rows.filter((row) => {
    const matchesQuery = Object.values(row).some((value) => String(value ?? "").toLowerCase().includes(query.toLowerCase()));
    const matchesStatus = statusFilter === "All" || String(row.status || "").toLowerCase() === statusFilter.toLowerCase();
    const matchesCategory = categoryFilter === "All" || row.category === categoryFilter;
    return matchesQuery && matchesStatus && matchesCategory;
  });

  const categories = [...new Set(products.map((item) => item.category))];
  const statuses = [...new Set(rows.map((item) => item.status).filter(Boolean))];

  function handleAdd() {
    if (!config?.addType) return;
    if (config.addType === "sale") return setModal({ type: "sale", title: "Create Invoice" });
    if (config.addType === "purchase") return setModal({ type: "purchase", title: "Add Purchase" });
    if (config.addType === "expense") return setModal({ type: "expense", title: "Add Expense" });
    setModal({ type: config.addType, title: config.action || "Add Record" });
  }

  return (
    <>
      <PageHeader title={page} subtitle={subtitle} action={config?.action} onAction={handleAdd} />
      {page === "Settings" ? (
        <SettingsPage />
      ) : (
        <>
          <div className="list-summary">
            <div><strong>{rows.length}</strong><span>Total records in this view</span></div>
            <div className="list-summary-icon"><FileText size={22} /></div>
          </div>
          <Panel title={`${page} Records`} subtitle="Search, filter, and review your records." className="records-panel">
            <div className="table-toolbar">
              <div className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${page.toLowerCase()}...`} /></div>
              <div className="filter-group">
                {page === "Products" || page === "Stock Overview" ? (
                  <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}><option value="All">All categories</option>{categories.map((category) => <option key={category}>{category}</option>)}</select>
                ) : null}
                {statuses.length > 0 && <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="All">All statuses</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select>}
                <button className="secondary-button" onClick={() => { setQuery(""); setStatusFilter("All"); setCategoryFilter("All"); }}><Download size={16} /> Reset</button>
              </div>
            </div>
            <DataTable columns={columns} rows={filteredRows} />
            <div className="table-footer"><span>Showing {filteredRows.length} of {rows.length} records</span><span>Demo data · Not yet connected to database</span></div>
          </Panel>
        </>
      )}
    </>
  );
}

function SettingsPage() {
  const [businessName, setBusinessName] = useState("My Business");
  const [currency, setCurrency] = useState("PKR");
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <Panel title="Business Settings" subtitle="Configure basic details for your Meezan workspace." className="settings-panel">
      <form className="settings-form" onSubmit={(event) => { event.preventDefault(); setSaved(true); }}>
        <label>Business name<input value={businessName} onChange={(event) => { setBusinessName(event.target.value); setSaved(false); }} required /></label>
        <label>Default currency<select value={currency} onChange={(event) => { setCurrency(event.target.value); setSaved(false); }}><option value="PKR">PKR — Pakistani Rupee</option><option value="USD">USD — US Dollar</option><option value="AED">AED — UAE Dirham</option></select></label>
        <label>Business phone<input value={phone} onChange={(event) => { setPhone(event.target.value); setSaved(false); }} placeholder="Enter business phone" /></label>
        <div className="settings-note"><ShieldCheck size={18} /><span>These settings are currently stored in this page's state only. Persistent settings will be added with the backend.</span></div>
        <button className="primary-button" type="submit"><Check size={17} /> Save settings</button>
        {saved && <p className="success-message">Settings updated for this session.</p>}
      </form>
    </Panel>
  );
}

function AssistantPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I'm the Meezan AI Business Assistant interface. Once the local AI model is connected, you will be able to ask questions about sales, stock, expenses, and business trends." },
  ]);

  function sendMessage(event) {
    event.preventDefault();
    if (!question.trim()) return;
    setMessages((current) => [...current, { role: "user", text: question.trim() }, { role: "assistant", text: "The AI service is not connected yet. This interface is ready for integration with a local model and your business database." }]);
    setQuestion("");
  }

  return (
    <>
      <PageHeader title="AI Business Assistant" subtitle="A future home for business insights and predictive analytics." />
      <div className="ai-banner"><div className="ai-banner-icon"><BrainCircuit size={28} /></div><div><h3>Your business, with AI assistance</h3><p>We will connect a local open-source model after the ERP database and business operations are implemented.</p></div><StatusBadge status="Not connected" /></div>
      <Panel title="Business Assistant" subtitle="Demo conversation interface" className="assistant-panel">
        <div className="chat-messages">{messages.map((message, index) => <div key={index} className={`chat-message ${message.role}`}><div className="chat-avatar">{message.role === "assistant" ? <BrainCircuit size={18} /> : "TA"}</div><div><span>{message.role === "assistant" ? "Meezan Assistant" : "You"}</span><p>{message.text}</p></div></div>)}</div>
        <form className="chat-form" onSubmit={sendMessage}><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about sales, stock, or expenses..." /><button className="primary-button" type="submit">Send <ChevronRight size={16} /></button></form>
      </Panel>
    </>
  );
}

function AddRecordModal({ modal, onClose, onSave }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Grocery");
  const [brand, setBrand] = useState("Local");
  const [unit, setUnit] = useState("Piece");
  const [price, setPrice] = useState("0");
  const [stock, setStock] = useState("0");
  const [minStock, setMinStock] = useState("10");
  const [party, setParty] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Unpaid");
  const [phone, setPhone] = useState("");

  if (!modal) return null;

  function submit(event) {
    event.preventDefault();
    onSave({ type: modal.type, name, category, brand, unit, price: Number(price), stock: Number(stock), minStock: Number(minStock), party: party || name, amount: Number(amount || price), status, phone });
  }

  const productForm = ["product"].includes(modal.type);
  const partyForm = ["customer", "supplier"].includes(modal.type);
  const transactionForm = ["sale", "purchase", "expense"].includes(modal.type);
  const simpleForm = ["category", "brand", "unit", "expense-category", "role", "team"].includes(modal.type);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="modal-card">
        <div className="modal-heading"><div><h2>{modal.title}</h2><p>Enter details for this demo record.</p></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={20} /></button></div>
        <form className="modal-form" onSubmit={submit}>
          {productForm && <>
            <label>Product name<input value={name} onChange={(event) => setName(event.target.value)} required autoFocus /></label>
            <div className="form-row"><label>Category<input value={category} onChange={(event) => setCategory(event.target.value)} required /></label><label>Brand<input value={brand} onChange={(event) => setBrand(event.target.value)} /></label></div>
            <div className="form-row"><label>Unit<input value={unit} onChange={(event) => setUnit(event.target.value)} required /></label><label>Sale price (PKR)<input type="number" min="0" value={price} onChange={(event) => setPrice(event.target.value)} required /></label></div>
            <div className="form-row"><label>Current stock<input type="number" min="0" value={stock} onChange={(event) => setStock(event.target.value)} required /></label><label>Minimum stock<input type="number" min="0" value={minStock} onChange={(event) => setMinStock(event.target.value)} required /></label></div>
          </>}
          {partyForm && <>
            <label>Name<input value={name} onChange={(event) => setName(event.target.value)} required autoFocus /></label>
            <label>Phone<input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="03xx-xxxxxxx" /></label>
          </>}
          {transactionForm && <>
            <label>{modal.type === "expense" ? "Expense name" : "Customer / Supplier"}<input value={party} onChange={(event) => setParty(event.target.value)} required autoFocus /></label>
            {modal.type === "expense" && <label>Category<input value={category} onChange={(event) => setCategory(event.target.value)} required /></label>}
            <label>Amount (PKR)<input type="number" min="0" value={amount} onChange={(event) => setAmount(event.target.value)} required /></label>
            <label>Status<select value={status} onChange={(event) => setStatus(event.target.value)}>{(modal.type === "purchase" ? ["Pending", "Received"] : ["Paid", "Partial", "Unpaid"]).map((item) => <option key={item}>{item}</option>)}</select></label>
          </>}
          {simpleForm && <label>{modal.type === "team" ? "Team member name" : "Name"}<input value={name} onChange={(event) => setName(event.target.value)} required autoFocus /></label>}
          <div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit"><Plus size={17} /> Add record</button></div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("Overview");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [products, setProducts] = useState(initialProducts);
  const [customers, setCustomers] = useState(initialCustomers);
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [sales, setSales] = useState(initialSales);
  const [purchases, setPurchases] = useState(initialPurchases);
  const [expenses, setExpenses] = useState(initialExpenses);

  function saveRecord(record) {
    const stamp = Date.now().toString().slice(-6);
    if (record.type === "product") {
      setProducts((items) => [...items, { id: `PR-${stamp}`, name: record.name, category: record.category, brand: record.brand, unit: record.unit, price: record.price, stock: record.stock, minStock: record.minStock }]);
    } else if (record.type === "customer") {
      setCustomers((items) => [...items, { id: `CUS-${stamp}`, name: record.name, phone: record.phone, email: "—", balance: 0 }]);
    } else if (record.type === "supplier") {
      setSuppliers((items) => [...items, { id: `SUP-${stamp}`, name: record.name, phone: record.phone, email: "—", balance: 0 }]);
    } else if (record.type === "sale") {
      setSales((items) => [{ id: `INV-${stamp}`, party: record.party, date: new Date().toISOString().slice(0, 10), amount: record.amount, status: record.status }, ...items]);
    } else if (record.type === "purchase") {
      setPurchases((items) => [{ id: `PUR-${stamp}`, party: record.party, date: new Date().toISOString().slice(0, 10), amount: record.amount, status: record.status }, ...items]);
    } else if (record.type === "expense") {
      setExpenses((items) => [{ id: `EXP-${stamp}`, name: record.party, category: record.category, date: new Date().toISOString().slice(0, 10), amount: record.amount, status: record.status }, ...items]);
    } else if (record.type === "category") {
      setProducts((items) => [...items, { id: `CAT-${stamp}`, name: "New product (edit category)", category: record.name, brand: "Local", unit: "Piece", price: 0, stock: 0, minStock: 10 }]);
      setActivePage("Categories");
    } else if (record.type === "brand") {
      setProducts((items) => [...items, { id: `BR-${stamp}`, name: "New product (edit brand)", category: "Grocery", brand: record.name, unit: "Piece", price: 0, stock: 0, minStock: 10 }]);
      setActivePage("Brands");
    } else if (record.type === "unit") {
      setProducts((items) => [...items, { id: `UNIT-${stamp}`, name: "New product (edit unit)", category: "Grocery", brand: "Local", unit: record.name, price: 0, stock: 0, minStock: 10 }]);
      setActivePage("Units");
    } else if (record.type === "expense-category") {
      setExpenses((items) => [...items, { id: `EC-${stamp}`, name: "New expense", category: record.name, date: new Date().toISOString().slice(0, 10), amount: 0, status: "Pending" }]);
      setActivePage("Expense Categories");
    }
    setModal(null);
  }

  function navigateTo(page) {
    setActivePage(page);
    setGlobalSearch("");
  }

  const allPages = [...navigation.flatMap((group) => group.items.map((item) => item.label)), "AI Business Assistant"];
  const searchResults = globalSearch.trim()
    ? allPages.filter((page) => page.toLowerCase().includes(globalSearch.toLowerCase())).slice(0, 6)
    : [];

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} setActivePage={navigateTo} collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className={`main-content ${collapsed ? "main-content-expanded" : ""}`}>
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={21} /></button>
            <button className="icon-button desktop-collapse" aria-label="Collapse sidebar" onClick={() => setCollapsed(!collapsed)}><ChevronLeft size={19} className={collapsed ? "rotate-icon" : ""} /></button>
            <div className="global-search"><Search size={18} /><input value={globalSearch} onChange={(event) => setGlobalSearch(event.target.value)} placeholder="Search pages..." />{globalSearch && <button className="icon-button" onClick={() => setGlobalSearch("")}><X size={15} /></button>}
              {searchResults.length > 0 && <div className="search-results">{searchResults.map((page) => <button key={page} onClick={() => navigateTo(page)}><Search size={15} />{page}<ChevronRight size={14} /></button>)}</div>}
            </div>
          </div>
          <div className="topbar-right">
            <span className="today-label"><CalendarDays size={16} /> {new Date().toLocaleDateString("en-PK", { day: "2-digit", month: "short", year: "numeric" })}</span>
            <button className="icon-button notification-button" title="Notifications" onClick={() => navigateTo("Stock Overview")}><Bell size={19} /><span /></button>
            <div className="topbar-divider" />
            <div className="topbar-user"><div className="profile-avatar">TA</div><div><strong>Administrator</strong><span>Admin</span></div><ChevronDown size={15} /></div>
          </div>
        </header>

        <div className="page-content">
          {activePage === "Overview" ? (
            <Overview products={products} sales={sales} purchases={purchases} expenses={expenses} setActivePage={navigateTo} />
          ) : activePage === "AI Business Assistant" ? (
            <AssistantPage />
          ) : (
            <RecordsPage
              key={activePage}
              page={activePage}
              products={products}
              setProducts={setProducts}
              customers={customers}
              setCustomers={setCustomers}
              suppliers={suppliers}
              setSuppliers={setSuppliers}
              sales={sales}
              setSales={setSales}
              purchases={purchases}
              setPurchases={setPurchases}
              expenses={expenses}
              setExpenses={setExpenses}
              setActivePage={navigateTo}
              setModal={setModal}
            />
          )}
          <footer className="app-footer"><span>© 2026 Meezan ERP</span><span>Business management made clearer.</span></footer>
        </div>
      </main>

      <AddRecordModal modal={modal} onClose={() => setModal(null)} onSave={saveRecord} />
    </div>
  );
}
