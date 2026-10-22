
import {
  LayoutDashboard,
  ReceiptText,
  ShoppingCart,
  Users,
  Package,
  Layers,
  Tags,
  Ruler,
  Boxes,
  Undo2,
  PackageMinus,
  Wallet,
  Folder,
  CreditCard,
  FileBarChart,
  UsersRound,
  ShieldCheck,
  Settings,
  History,
  Truck,
} from "lucide-react";

export const navigation = [
  {
    title: "WORKSPACE",
    items: [
      { label: "Overview", icon: LayoutDashboard },
      { label: "Sales & Invoices", icon: ReceiptText },
      { label: "Purchases", icon: ShoppingCart },
      { label: "Customers", icon: Users },
    ],
  },
  {
    title: "INVENTORY",
    items: [
      { label: "Products", icon: Package },
      { label: "Categories", icon: Layers },
      { label: "Brands", icon: Tags },
      { label: "Units", icon: Ruler },
      { label: "Stock Overview", icon: Boxes },
    ],
  },
  {
    title: "ACCOUNTING",
    items: [
      { label: "Sales Returns", icon: Undo2 },
      { label: "Purchase Returns", icon: PackageMinus },
      { label: "Expenses", icon: Wallet },
      { label: "Expense Categories", icon: Folder },
      { label: "Payments", icon: CreditCard },
      { label: "Reports", icon: FileBarChart },
    ],
  },
  {
    title: "ADMINISTRATION",
    items: [
      { label: "Team & Permissions", icon: UsersRound },
      { label: "Roles", icon: ShieldCheck },
      { label: "Settings", icon: Settings },
      { label: "Activity Log", icon: History },
      { label: "Suppliers", icon: Truck },
    ],
  },
];
