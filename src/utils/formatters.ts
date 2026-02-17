export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('es-MX').format(n);
}

export function formatPercent(n: number): string {
  return `${n.toFixed(1)}%`;
}

export function getMargin(purchase: number, sale: number): number {
  if (sale === 0) return 0;
  return ((sale - purchase) / sale) * 100;
}

export function getProfit(purchase: number, sale: number): number {
  return sale - purchase;
}

export function formatTimeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `hace ${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `hace ${days}d`;
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getStockLevel(stock: number, minStock: number): 'ok' | 'low' | 'critical' | 'out' {
  if (stock === 0) return 'out';
  if (stock <= minStock * 0.5) return 'critical';
  if (stock <= minStock) return 'low';
  return 'ok';
}
