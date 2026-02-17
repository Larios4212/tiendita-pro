import {
  Product, Sale, InventoryAlert, DashboardStats,
  TopProduct, HourlySalesPoint, DailySalesPoint,
} from '@/utils/types';

/* ════════════════════════ PRODUCTS ════════════════════════ */
export const MOCK_PRODUCTS: Product[] = [
  /* ── Bebidas ── */
  { id: 'p01', name: 'Coca-Cola 600ml', category: 'bebidas', sku: 'BEB-001', purchasePrice: 12, salePrice: 20, stock: 48, minStock: 24, unit: 'pza', supplier: 'FEMSA', lastRestocked: '2026-02-15', monthlySales: 320 },
  { id: 'p02', name: 'Pepsi 600ml', category: 'bebidas', sku: 'BEB-002', purchasePrice: 11, salePrice: 18, stock: 36, minStock: 20, unit: 'pza', supplier: 'PepsiCo', lastRestocked: '2026-02-14', monthlySales: 180 },
  { id: 'p03', name: 'Agua Ciel 1L', category: 'bebidas', sku: 'BEB-003', purchasePrice: 6, salePrice: 14, stock: 60, minStock: 30, unit: 'pza', supplier: 'FEMSA', lastRestocked: '2026-02-16', monthlySales: 240 },
  { id: 'p04', name: 'Jumex Mango 335ml', category: 'bebidas', sku: 'BEB-004', purchasePrice: 8, salePrice: 15, stock: 18, minStock: 20, unit: 'pza', supplier: 'Jumex', lastRestocked: '2026-02-10', monthlySales: 120 },
  { id: 'p05', name: 'Boing Guayaba 500ml', category: 'bebidas', sku: 'BEB-005', purchasePrice: 7, salePrice: 13, stock: 5, minStock: 15, unit: 'pza', supplier: 'Pascual', lastRestocked: '2026-02-08', monthlySales: 90 },
  { id: 'p06', name: 'Gatorade 600ml', category: 'bebidas', sku: 'BEB-006', purchasePrice: 14, salePrice: 25, stock: 22, minStock: 12, unit: 'pza', supplier: 'PepsiCo', lastRestocked: '2026-02-13', monthlySales: 75 },

  /* ── Botanas ── */
  { id: 'p07', name: 'Sabritas Original 45g', category: 'botanas', sku: 'BOT-001', purchasePrice: 10, salePrice: 18, stock: 30, minStock: 15, unit: 'pza', supplier: 'PepsiCo', lastRestocked: '2026-02-14', monthlySales: 200 },
  { id: 'p08', name: 'Doritos Nacho 62g', category: 'botanas', sku: 'BOT-002', purchasePrice: 12, salePrice: 22, stock: 25, minStock: 15, unit: 'pza', supplier: 'PepsiCo', lastRestocked: '2026-02-14', monthlySales: 170 },
  { id: 'p09', name: 'Takis Fuego 70g', category: 'botanas', sku: 'BOT-003', purchasePrice: 11, salePrice: 20, stock: 3, minStock: 15, unit: 'pza', supplier: 'Barcel', lastRestocked: '2026-02-05', monthlySales: 250 },
  { id: 'p10', name: 'Cheetos Flamin Hot 52g', category: 'botanas', sku: 'BOT-004', purchasePrice: 10, salePrice: 18, stock: 20, minStock: 12, unit: 'pza', supplier: 'PepsiCo', lastRestocked: '2026-02-12', monthlySales: 140 },

  /* ── Lácteos ── */
  { id: 'p11', name: 'Leche Lala Entera 1L', category: 'lacteos', sku: 'LAC-001', purchasePrice: 22, salePrice: 32, stock: 15, minStock: 10, unit: 'pza', supplier: 'Lala', lastRestocked: '2026-02-16', monthlySales: 160 },
  { id: 'p12', name: 'Yogurt Danone Natural 900g', category: 'lacteos', sku: 'LAC-002', purchasePrice: 28, salePrice: 42, stock: 8, minStock: 6, unit: 'pza', supplier: 'Danone', lastRestocked: '2026-02-15', monthlySales: 45 },
  { id: 'p13', name: 'Queso Oaxaca 250g', category: 'lacteos', sku: 'LAC-003', purchasePrice: 35, salePrice: 55, stock: 4, minStock: 5, unit: 'pza', supplier: 'La Villita', lastRestocked: '2026-02-11', monthlySales: 30 },

  /* ── Abarrotes ── */
  { id: 'p14', name: 'Frijoles La Costeña 560g', category: 'abarrotes', sku: 'ABA-001', purchasePrice: 18, salePrice: 28, stock: 22, minStock: 10, unit: 'pza', supplier: 'La Costeña', lastRestocked: '2026-02-13', monthlySales: 80 },
  { id: 'p15', name: 'Atún Dolores en Agua 140g', category: 'abarrotes', sku: 'ABA-002', purchasePrice: 16, salePrice: 26, stock: 18, minStock: 10, unit: 'pza', supplier: 'Dolores', lastRestocked: '2026-02-12', monthlySales: 95 },
  { id: 'p16', name: 'Aceite 123 1L', category: 'abarrotes', sku: 'ABA-003', purchasePrice: 32, salePrice: 48, stock: 10, minStock: 5, unit: 'pza', supplier: '123', lastRestocked: '2026-02-10', monthlySales: 40 },
  { id: 'p17', name: 'Arroz Verde Valle 1kg', category: 'abarrotes', sku: 'ABA-004', purchasePrice: 20, salePrice: 35, stock: 12, minStock: 6, unit: 'pza', supplier: 'Verde Valle', lastRestocked: '2026-02-09', monthlySales: 50 },
  { id: 'p18', name: 'Azúcar Morena 1kg', category: 'abarrotes', sku: 'ABA-005', purchasePrice: 25, salePrice: 38, stock: 8, minStock: 5, unit: 'pza', supplier: 'Zulka', lastRestocked: '2026-02-11', monthlySales: 35 },

  /* ── Limpieza ── */
  { id: 'p19', name: 'Fabuloso Lavanda 1L', category: 'limpieza', sku: 'LIM-001', purchasePrice: 22, salePrice: 35, stock: 14, minStock: 6, unit: 'pza', supplier: 'Colgate-Palmolive', lastRestocked: '2026-02-14', monthlySales: 55 },
  { id: 'p20', name: 'Cloralex 1L', category: 'limpieza', sku: 'LIM-002', purchasePrice: 18, salePrice: 30, stock: 0, minStock: 5, unit: 'pza', supplier: 'Alen', lastRestocked: '2026-01-28', monthlySales: 30 },
  { id: 'p21', name: 'Papel Higiénico Pétalo 4pz', category: 'limpieza', sku: 'LIM-003', purchasePrice: 28, salePrice: 45, stock: 10, minStock: 8, unit: 'paq', supplier: 'Kimberly-Clark', lastRestocked: '2026-02-13', monthlySales: 65 },

  /* ── Higiene ── */
  { id: 'p22', name: 'Jabón Zest 150g', category: 'higiene', sku: 'HIG-001', purchasePrice: 12, salePrice: 22, stock: 16, minStock: 8, unit: 'pza', supplier: 'Unilever', lastRestocked: '2026-02-12', monthlySales: 40 },
  { id: 'p23', name: 'Shampoo Caprice 800ml', category: 'higiene', sku: 'HIG-002', purchasePrice: 38, salePrice: 62, stock: 6, minStock: 4, unit: 'pza', supplier: 'Colgate-Palmolive', lastRestocked: '2026-02-10', monthlySales: 20 },
  { id: 'p24', name: 'Pasta Dental Colgate 100ml', category: 'higiene', sku: 'HIG-003', purchasePrice: 20, salePrice: 35, stock: 12, minStock: 6, unit: 'pza', supplier: 'Colgate-Palmolive', lastRestocked: '2026-02-14', monthlySales: 35 },

  /* ── Dulces ── */
  { id: 'p25', name: 'Mazapán De la Rosa', category: 'dulces', sku: 'DUL-001', purchasePrice: 3, salePrice: 5, stock: 50, minStock: 30, unit: 'pza', supplier: 'De la Rosa', lastRestocked: '2026-02-15', monthlySales: 280 },
  { id: 'p26', name: 'Pulparindo Original', category: 'dulces', sku: 'DUL-002', purchasePrice: 3, salePrice: 6, stock: 40, minStock: 25, unit: 'pza', supplier: 'De la Rosa', lastRestocked: '2026-02-15', monthlySales: 200 },
  { id: 'p27', name: 'Paleta Payaso', category: 'dulces', sku: 'DUL-003', purchasePrice: 5, salePrice: 10, stock: 2, minStock: 15, unit: 'pza', supplier: 'Ricolino', lastRestocked: '2026-02-03', monthlySales: 150 },
  { id: 'p28', name: 'Chicle Trident 18pz', category: 'dulces', sku: 'DUL-004', purchasePrice: 15, salePrice: 28, stock: 20, minStock: 10, unit: 'paq', supplier: 'Mondelēz', lastRestocked: '2026-02-14', monthlySales: 60 },

  /* ── Pan ── */
  { id: 'p29', name: 'Pan Bimbo Blanco 680g', category: 'pan', sku: 'PAN-001', purchasePrice: 35, salePrice: 52, stock: 8, minStock: 5, unit: 'pza', supplier: 'Bimbo', lastRestocked: '2026-02-16', monthlySales: 110 },
  { id: 'p30', name: 'Donas Bimbo 6pz', category: 'pan', sku: 'PAN-002', purchasePrice: 28, salePrice: 42, stock: 6, minStock: 4, unit: 'paq', supplier: 'Bimbo', lastRestocked: '2026-02-16', monthlySales: 55 },

  /* ── Frutas ── */
  { id: 'p31', name: 'Plátano (kg)', category: 'frutas', sku: 'FRU-001', purchasePrice: 15, salePrice: 25, stock: 12, minStock: 5, unit: 'kg', supplier: 'Mercado Local', lastRestocked: '2026-02-16', monthlySales: 80 },
  { id: 'p32', name: 'Limón (kg)', category: 'frutas', sku: 'FRU-002', purchasePrice: 20, salePrice: 35, stock: 8, minStock: 3, unit: 'kg', supplier: 'Mercado Local', lastRestocked: '2026-02-16', monthlySales: 60 },
];

/* ════════════════════════ TODAY'S SALES ════════════════════════ */
function hoursAgo(h: number, m: number = 0): string {
  const d = new Date();
  d.setHours(d.getHours() - h, d.getMinutes() - m);
  return d.toISOString();
}

export const MOCK_SALES: Sale[] = [
  {
    id: 's01', timestamp: hoursAgo(6, 30), paymentMethod: 'cash', discount: 0,
    items: [
      { productId: 'p01', productName: 'Coca-Cola 600ml', quantity: 2, unitPrice: 20, subtotal: 40 },
      { productId: 'p07', productName: 'Sabritas Original 45g', quantity: 1, unitPrice: 18, subtotal: 18 },
    ],
    subtotal: 58, total: 58,
  },
  {
    id: 's02', timestamp: hoursAgo(5, 45), paymentMethod: 'cash', discount: 0,
    items: [
      { productId: 'p25', productName: 'Mazapán De la Rosa', quantity: 5, unitPrice: 5, subtotal: 25 },
      { productId: 'p03', productName: 'Agua Ciel 1L', quantity: 1, unitPrice: 14, subtotal: 14 },
    ],
    subtotal: 39, total: 39,
  },
  {
    id: 's03', timestamp: hoursAgo(5, 10), paymentMethod: 'card', discount: 0,
    items: [
      { productId: 'p11', productName: 'Leche Lala Entera 1L', quantity: 2, unitPrice: 32, subtotal: 64 },
      { productId: 'p29', productName: 'Pan Bimbo Blanco 680g', quantity: 1, unitPrice: 52, subtotal: 52 },
      { productId: 'p14', productName: 'Frijoles La Costeña 560g', quantity: 1, unitPrice: 28, subtotal: 28 },
    ],
    subtotal: 144, total: 144,
  },
  {
    id: 's04', timestamp: hoursAgo(4, 20), paymentMethod: 'cash', discount: 5,
    items: [
      { productId: 'p09', productName: 'Takis Fuego 70g', quantity: 3, unitPrice: 20, subtotal: 60 },
      { productId: 'p01', productName: 'Coca-Cola 600ml', quantity: 3, unitPrice: 20, subtotal: 60 },
      { productId: 'p26', productName: 'Pulparindo Original', quantity: 4, unitPrice: 6, subtotal: 24 },
    ],
    subtotal: 144, total: 139,
  },
  {
    id: 's05', timestamp: hoursAgo(3, 50), paymentMethod: 'transfer', discount: 0,
    items: [
      { productId: 'p19', productName: 'Fabuloso Lavanda 1L', quantity: 2, unitPrice: 35, subtotal: 70 },
      { productId: 'p21', productName: 'Papel Higiénico Pétalo 4pz', quantity: 1, unitPrice: 45, subtotal: 45 },
      { productId: 'p22', productName: 'Jabón Zest 150g', quantity: 2, unitPrice: 22, subtotal: 44 },
    ],
    subtotal: 159, total: 159,
  },
  {
    id: 's06', timestamp: hoursAgo(3, 15), paymentMethod: 'cash', discount: 0,
    items: [
      { productId: 'p08', productName: 'Doritos Nacho 62g', quantity: 2, unitPrice: 22, subtotal: 44 },
      { productId: 'p06', productName: 'Gatorade 600ml', quantity: 2, unitPrice: 25, subtotal: 50 },
    ],
    subtotal: 94, total: 94,
  },
  {
    id: 's07', timestamp: hoursAgo(2, 40), paymentMethod: 'cash', discount: 0,
    items: [
      { productId: 'p02', productName: 'Pepsi 600ml', quantity: 1, unitPrice: 18, subtotal: 18 },
      { productId: 'p10', productName: 'Cheetos Flamin Hot 52g', quantity: 1, unitPrice: 18, subtotal: 18 },
      { productId: 'p27', productName: 'Paleta Payaso', quantity: 2, unitPrice: 10, subtotal: 20 },
    ],
    subtotal: 56, total: 56,
  },
  {
    id: 's08', timestamp: hoursAgo(2, 0), paymentMethod: 'card', discount: 10,
    items: [
      { productId: 'p16', productName: 'Aceite 123 1L', quantity: 1, unitPrice: 48, subtotal: 48 },
      { productId: 'p17', productName: 'Arroz Verde Valle 1kg', quantity: 2, unitPrice: 35, subtotal: 70 },
      { productId: 'p15', productName: 'Atún Dolores en Agua 140g', quantity: 3, unitPrice: 26, subtotal: 78 },
      { productId: 'p18', productName: 'Azúcar Morena 1kg', quantity: 1, unitPrice: 38, subtotal: 38 },
    ],
    subtotal: 234, total: 224,
  },
  {
    id: 's09', timestamp: hoursAgo(1, 20), paymentMethod: 'cash', discount: 0,
    items: [
      { productId: 'p01', productName: 'Coca-Cola 600ml', quantity: 1, unitPrice: 20, subtotal: 20 },
      { productId: 'p28', productName: 'Chicle Trident 18pz', quantity: 1, unitPrice: 28, subtotal: 28 },
    ],
    subtotal: 48, total: 48,
  },
  {
    id: 's10', timestamp: hoursAgo(0, 35), paymentMethod: 'cash', discount: 0,
    items: [
      { productId: 'p13', productName: 'Queso Oaxaca 250g', quantity: 1, unitPrice: 55, subtotal: 55 },
      { productId: 'p31', productName: 'Plátano (kg)', quantity: 2, unitPrice: 25, subtotal: 50 },
      { productId: 'p32', productName: 'Limón (kg)', quantity: 1, unitPrice: 35, subtotal: 35 },
      { productId: 'p24', productName: 'Pasta Dental Colgate 100ml', quantity: 1, unitPrice: 35, subtotal: 35 },
    ],
    subtotal: 175, total: 175,
  },
];

/* ════════════════════════ CHARTS ════════════════════════ */
export const MOCK_HOURLY_SALES: HourlySalesPoint[] = [
  { hour: '8 AM', sales: 180 },
  { hour: '9 AM', sales: 320 },
  { hour: '10 AM', sales: 540 },
  { hour: '11 AM', sales: 420 },
  { hour: '12 PM', sales: 680 },
  { hour: '1 PM', sales: 750 },
  { hour: '2 PM', sales: 610 },
  { hour: '3 PM', sales: 480 },
  { hour: '4 PM', sales: 390 },
  { hour: '5 PM', sales: 520 },
  { hour: '6 PM', sales: 710 },
  { hour: '7 PM', sales: 580 },
];

export const MOCK_DAILY_SALES: DailySalesPoint[] = [
  { day: 'Lun', sales: 4200, profit: 1680 },
  { day: 'Mar', sales: 3800, profit: 1520 },
  { day: 'Mié', sales: 4600, profit: 1840 },
  { day: 'Jue', sales: 5100, profit: 2040 },
  { day: 'Vie', sales: 6200, profit: 2480 },
  { day: 'Sáb', sales: 7800, profit: 3120 },
  { day: 'Dom', sales: 5400, profit: 2160 },
];

/* ════════════════════════ TOP PRODUCTS ════════════════════════ */
export const MOCK_TOP_PRODUCTS: TopProduct[] = [
  { name: 'Coca-Cola 600ml', sold: 42, revenue: 840 },
  { name: 'Mazapán De la Rosa', sold: 38, revenue: 190 },
  { name: 'Takis Fuego 70g', sold: 35, revenue: 700 },
  { name: 'Sabritas Original 45g', sold: 28, revenue: 504 },
  { name: 'Agua Ciel 1L', sold: 26, revenue: 364 },
];

/* ════════════════════════ ALERTS ════════════════════════ */
export function generateAlerts(products: Product[]): InventoryAlert[] {
  const alerts: InventoryAlert[] = [];
  let aid = 1;

  products.forEach((p) => {
    if (p.stock === 0) {
      alerts.push({
        id: `a${aid++}`, type: 'out-of-stock', productId: p.id, productName: p.name,
        message: `${p.name} está agotado. Últimamente se vendían ~${p.monthlySales} unidades al mes.`,
        severity: 'critical', timestamp: new Date().toISOString(),
        currentStock: 0, minStock: p.minStock,
      });
    } else if (p.stock <= p.minStock * 0.5) {
      alerts.push({
        id: `a${aid++}`, type: 'low-stock', productId: p.id, productName: p.name,
        message: `Stock crítico: solo ${p.stock} ${p.unit} (mínimo: ${p.minStock}). Reabastecer urgente.`,
        severity: 'critical', timestamp: new Date().toISOString(),
        currentStock: p.stock, minStock: p.minStock,
      });
    } else if (p.stock <= p.minStock) {
      alerts.push({
        id: `a${aid++}`, type: 'low-stock', productId: p.id, productName: p.name,
        message: `Stock bajo: ${p.stock} ${p.unit} de ${p.minStock} requeridas. Considerar reposición.`,
        severity: 'warning', timestamp: new Date().toISOString(),
        currentStock: p.stock, minStock: p.minStock,
      });
    }

    // Slow-moving: low monthly sales relative to stock
    if (p.stock > 0 && p.monthlySales < 25 && p.stock > p.minStock * 2) {
      alerts.push({
        id: `a${aid++}`, type: 'slow-moving', productId: p.id, productName: p.name,
        message: `Baja rotación: solo ${p.monthlySales} ventas/mes con ${p.stock} en stock. Considerar promoción.`,
        severity: 'info', timestamp: new Date().toISOString(),
        currentStock: p.stock, minStock: p.minStock,
      });
    }
  });

  // Restock suggestions
  const lowOnes = products.filter((p) => p.stock <= p.minStock).slice(0, 3);
  if (lowOnes.length > 0) {
    alerts.push({
      id: `a${aid++}`, type: 'restock', productId: '', productName: '',
      message: `Sugerencia: ${lowOnes.length} productos necesitan reposición. Contacta a tus proveedores.`,
      severity: 'info', timestamp: new Date().toISOString(),
    });
  }

  return alerts;
}

/* ════════════════════════ DASHBOARD STATS ════════════════════════ */
export function computeStats(products: Product[], sales: Sale[]): DashboardStats {
  const todaySales = sales.reduce((s, sale) => s + sale.total, 0);
  const todayTransactions = sales.length;
  const monthlyRevenue = 37_200; // simulated
  const totalCost = products.reduce((s, p) => s + p.purchasePrice * Math.min(p.monthlySales, p.stock), 0);
  const totalSale = products.reduce((s, p) => s + p.salePrice * Math.min(p.monthlySales, p.stock), 0);
  const estimatedMargin = totalSale > 0 ? ((totalSale - totalCost) / totalSale) * 100 : 0;
  const lowStockCount = products.filter((p) => p.stock <= p.minStock).length;

  return {
    todaySales,
    todayTransactions,
    monthlyRevenue,
    monthlyProfit: Math.round(monthlyRevenue * estimatedMargin / 100),
    estimatedMargin: Math.round(estimatedMargin * 10) / 10,
    lowStockCount,
    totalProducts: products.length,
  };
}
