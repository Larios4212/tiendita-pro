import { ProductCategory } from './types';

/* ── Category config ─────────────────────────────── */
export interface CategoryConfig {
  id: ProductCategory;
  label: string;
  emoji: string;
  color: string;
}

export const CATEGORIES: CategoryConfig[] = [
  { id: 'bebidas', label: 'Bebidas', emoji: '🥤', color: 'text-blue-400' },
  { id: 'botanas', label: 'Botanas', emoji: '🍿', color: 'text-orange-400' },
  { id: 'lacteos', label: 'Lácteos', emoji: '🧀', color: 'text-yellow-300' },
  { id: 'abarrotes', label: 'Abarrotes', emoji: '🛒', color: 'text-amber-400' },
  { id: 'limpieza', label: 'Limpieza', emoji: '🧹', color: 'text-cyan-400' },
  { id: 'higiene', label: 'Higiene', emoji: '🧴', color: 'text-pink-400' },
  { id: 'dulces', label: 'Dulces', emoji: '🍬', color: 'text-rose-400' },
  { id: 'pan', label: 'Pan', emoji: '🍞', color: 'text-amber-300' },
  { id: 'frutas', label: 'Frutas', emoji: '🍎', color: 'text-red-400' },
  { id: 'otros', label: 'Otros', emoji: '📦', color: 'text-surface-400' },
];

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<ProductCategory, CategoryConfig>;

/* ── Alert severity config ───────────────────────── */
export const SEVERITY_CONFIG = {
  critical: { label: 'Crítico', badgeClass: 'badge-danger', dotClass: 'bg-danger-500' },
  warning: { label: 'Atención', badgeClass: 'badge-warning', dotClass: 'bg-accent-500' },
  info: { label: 'Info', badgeClass: 'badge-info', dotClass: 'bg-blue-500' },
} as const;

/* ── Chart colors ────────────────────────────────── */
export const CHART_COLORS = {
  primary: '#10b981',
  primaryLight: '#34d399',
  accent: '#f59e0b',
  danger: '#f43f5e',
  blue: '#3b82f6',
  surface: '#64748b',
};

/* ── Payment methods ─────────────────────────────── */
export const PAYMENT_METHODS = [
  { id: 'cash' as const, label: 'Efectivo', emoji: '💵' },
  { id: 'card' as const, label: 'Tarjeta', emoji: '💳' },
  { id: 'transfer' as const, label: 'Transferencia', emoji: '📱' },
];
