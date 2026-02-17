/* ── Product ─────────────────────────────────────── */
export type ProductCategory =
  | 'bebidas'
  | 'botanas'
  | 'lacteos'
  | 'abarrotes'
  | 'limpieza'
  | 'higiene'
  | 'dulces'
  | 'pan'
  | 'frutas'
  | 'otros';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  sku: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  unit: string;
  supplier: string;
  lastRestocked: string;
  monthlySales: number;
}

/* ── Sales ───────────────────────────────────────── */
export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export type PaymentMethod = 'cash' | 'card' | 'transfer';

export interface Sale {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  timestamp: string;
}

/* ── Dashboard ───────────────────────────────────── */
export interface DashboardStats {
  todaySales: number;
  todayTransactions: number;
  monthlyRevenue: number;
  monthlyProfit: number;
  estimatedMargin: number;
  lowStockCount: number;
  totalProducts: number;
}

export interface TopProduct {
  name: string;
  sold: number;
  revenue: number;
}

export interface HourlySalesPoint {
  hour: string;
  sales: number;
}

export interface DailySalesPoint {
  day: string;
  sales: number;
  profit: number;
}

/* ── Alerts ──────────────────────────────────────── */
export type AlertType = 'low-stock' | 'out-of-stock' | 'slow-moving' | 'restock';

export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface InventoryAlert {
  id: string;
  type: AlertType;
  productId: string;
  productName: string;
  message: string;
  severity: AlertSeverity;
  timestamp: string;
  currentStock?: number;
  minStock?: number;
}
