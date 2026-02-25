import { motion } from 'framer-motion';
import {
  DollarSign, ShoppingBag, Percent,
  AlertTriangle, Package, ArrowUpRight,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { StatCard } from '@/components/ui';
import { useAppStore } from '@/store/appStore';
import { formatCurrency } from '@/utils/formatters';
import { MOCK_HOURLY_SALES, MOCK_DAILY_SALES, MOCK_TOP_PRODUCTS } from '@/services/mockData';
import { CATEGORY_MAP } from '@/utils/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DashboardPage() {
  const { stats, sales, products } = useAppStore();

  // Low-stock products for the alert section
  const lowStockProducts = products
    .filter((p) => p.stock <= p.minStock)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);

  // Recent sales
  const recentSales = sales.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-surface-400">Resumen de tu negocio en tiempo real</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Ventas del Día"
          value={stats.todaySales}
          icon={DollarSign}
          format={formatCurrency}
          accent="text-primary-400"
          trend={{ value: 12.5, positive: true }}
        />
        <StatCard
          label="Transacciones Hoy"
          value={stats.todayTransactions}
          icon={ShoppingBag}
          accent="text-accent-400"
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          label="Margen Estimado"
          value={stats.estimatedMargin}
          icon={Percent}
          format={(v) => `${v.toFixed(1)}%`}
          accent="text-primary-300"
        />
        <StatCard
          label="Bajo Stock"
          value={stats.lowStockCount}
          icon={AlertTriangle}
          accent="text-danger-400"
        />
      </div>

      {/* ── Charts Row ── */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Hourly Sales */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="glass rounded-2xl p-5">
          <h3 className="mb-4 text-sm font-semibold text-surface-300">Ventas por Hora — Hoy</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MOCK_HOURLY_SALES}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${v}`} width={45} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', fontSize: '12px' }}
                formatter={(value: number) => [formatCurrency(value), 'Ventas']}
              />
              <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} fill="url(#salesGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Weekly Sales + Profit */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="glass rounded-2xl p-5">
          <h3 className="mb-4 text-sm font-semibold text-surface-300">Ventas vs Ganancia — Semana</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MOCK_DAILY_SALES}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} width={40} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', fontSize: '12px' }}
                formatter={(value: number, name: string) => [formatCurrency(value), name === 'sales' ? 'Ventas' : 'Ganancia']}
              />
              <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} opacity={0.7} />
              <Bar dataKey="profit" fill="#f59e0b" radius={[4, 4, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-center gap-4 justify-center text-xs text-surface-500">
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-primary-500 opacity-70" /> Ventas</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-accent-500 opacity-80" /> Ganancia</span>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Row ── */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Top Products */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="glass rounded-2xl p-5 lg:col-span-1">
          <h3 className="mb-4 text-sm font-semibold text-surface-300">🏆 Más Vendidos Hoy</h3>
          <div className="space-y-3">
            {MOCK_TOP_PRODUCTS.map((tp, i) => (
              <div key={tp.name} className="flex items-center gap-3">
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                  i === 0 ? 'bg-accent-500/20 text-accent-400' : 'bg-surface-700/60 text-surface-400'
                }`}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-white">{tp.name}</p>
                  <p className="text-xs text-surface-500">{tp.sold} vendidos</p>
                </div>
                <span className="text-sm font-semibold text-primary-400">{formatCurrency(tp.revenue)}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Low Stock Alerts */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="glass rounded-2xl p-5 lg:col-span-1">
          <h3 className="mb-4 text-sm font-semibold text-surface-300 flex items-center gap-2">
            <AlertTriangle size={14} className="text-danger-400" /> Bajo Inventario
          </h3>
          {lowStockProducts.length === 0 ? (
            <p className="text-sm text-surface-500">Todo en orden 👍</p>
          ) : (
            <div className="space-y-2.5">
              {lowStockProducts.map((p) => {
                const cat = CATEGORY_MAP[p.category];
                return (
                  <div key={p.id} className="flex items-center gap-3 rounded-lg bg-surface-800/50 px-3 py-2">
                    <span className="text-base">{cat?.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm text-white">{p.name}</p>
                      <p className="text-xs text-surface-500">{p.stock} / {p.minStock} {p.unit}</p>
                    </div>
                    <span className={`badge ${p.stock === 0 ? 'badge-danger' : p.stock <= p.minStock * 0.5 ? 'badge-danger' : 'badge-warning'}`}>
                      {p.stock === 0 ? 'Agotado' : 'Bajo'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Recent Sales */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="glass rounded-2xl p-5 lg:col-span-1">
          <h3 className="mb-4 text-sm font-semibold text-surface-300">🕐 Ventas Recientes</h3>
          <div className="space-y-2.5">
            {recentSales.map((s) => (
              <div key={s.id} className="flex items-center gap-3 rounded-lg bg-surface-800/50 px-3 py-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  s.paymentMethod === 'cash' ? 'bg-primary-500/15 text-primary-400'
                  : s.paymentMethod === 'card' ? 'bg-blue-500/15 text-blue-400'
                  : 'bg-accent-500/15 text-accent-400'
                }`}>
                  {s.paymentMethod === 'cash' ? '💵' : s.paymentMethod === 'card' ? '💳' : '📱'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm text-white">{s.items.length} producto{s.items.length > 1 ? 's' : ''}</p>
                  <p className="text-xs text-surface-500">
                    {new Date(s.timestamp).toLocaleTimeString('es-MX', { hour: 'numeric', minute: '2-digit' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{formatCurrency(s.total)}</p>
                  {s.discount > 0 && <p className="text-[10px] text-accent-400">-{formatCurrency(s.discount)}</p>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Revenue Summary ── */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="glass rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-surface-300">Resumen Mensual</h3>
            <p className="text-xs text-surface-500">Estimado basado en ventas actuales</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-xs text-surface-500">Ingresos</p>
              <p className="text-xl font-bold text-white flex items-center gap-1">
                {formatCurrency(stats.monthlyRevenue)}
                <ArrowUpRight size={16} className="text-primary-400" />
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-surface-500">Ganancia</p>
              <p className="text-xl font-bold text-primary-400 flex items-center gap-1">
                {formatCurrency(stats.monthlyProfit)}
                <ArrowUpRight size={16} />
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-surface-500">Productos</p>
              <p className="text-xl font-bold text-white flex items-center gap-1">
                <Package size={16} className="text-surface-400" />
                {stats.totalProducts}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
