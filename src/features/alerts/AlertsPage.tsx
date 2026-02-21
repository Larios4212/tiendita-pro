import { motion } from 'framer-motion';
import {
  Bell, AlertTriangle, PackageX, TrendingDown, RefreshCw,
  Package,
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { SEVERITY_CONFIG, CATEGORY_MAP } from '@/utils/constants';
import { formatTimeAgo } from '@/utils/formatters';
import { AlertType } from '@/utils/types';

const ALERT_ICON: Record<AlertType, typeof AlertTriangle> = {
  'low-stock': AlertTriangle,
  'out-of-stock': PackageX,
  'slow-moving': TrendingDown,
  'restock': RefreshCw,
};

const ALERT_TYPE_LABEL: Record<AlertType, string> = {
  'low-stock': 'Stock Bajo',
  'out-of-stock': 'Agotado',
  'slow-moving': 'Baja Rotación',
  'restock': 'Reposición',
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

export default function AlertsPage() {
  const { alerts, products } = useAppStore();

  const critical = alerts.filter((a) => a.severity === 'critical');
  const warnings = alerts.filter((a) => a.severity === 'warning');
  const info = alerts.filter((a) => a.severity === 'info');

  return (
    <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Bell size={24} className="text-primary-400" /> Alertas Inteligentes
        </h1>
        <p className="text-xs sm:text-sm text-surface-400">{alerts.length} alertas activas · monitoreo automático del inventario</p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass flex items-center gap-4 rounded-2xl p-5 border-l-4 border-danger-500">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-danger-500/15 text-danger-400">
            <PackageX size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{critical.length}</p>
            <p className="text-sm text-surface-400">Críticas</p>
          </div>
        </div>
        <div className="glass flex items-center gap-4 rounded-2xl p-5 border-l-4 border-accent-500">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{warnings.length}</p>
            <p className="text-sm text-surface-400">Atención</p>
          </div>
        </div>
        <div className="glass flex items-center gap-4 rounded-2xl p-5 border-l-4 border-blue-500">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
            <TrendingDown size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{info.length}</p>
            <p className="text-sm text-surface-400">Información</p>
          </div>
        </div>
      </div>

      {/* Alert sections */}
      {[
        { title: '🔴 Alertas Críticas', items: critical, emptyMsg: 'Sin alertas críticas' },
        { title: '🟡 Atención Requerida', items: warnings, emptyMsg: 'Sin alertas de atención' },
        { title: '🔵 Información', items: info, emptyMsg: 'Sin alertas informativas' },
      ].map((section) => (
        <div key={section.title}>
          <h2 className="mb-3 text-sm font-semibold text-surface-300">{section.title}</h2>
          {section.items.length === 0 ? (
            <div className="glass rounded-xl p-4 text-center text-sm text-surface-500">{section.emptyMsg}</div>
          ) : (
            <div className="space-y-2">
              <motion.div initial="hidden" animate="visible" className="space-y-2">
                {section.items.map((alert, i) => {
                  const Icon = ALERT_ICON[alert.type];
                  const severity = SEVERITY_CONFIG[alert.severity];
                  const product = alert.productId ? products.find((p) => p.id === alert.productId) : null;
                  const cat = product ? CATEGORY_MAP[product.category] : null;

                  return (
                    <motion.div
                      key={alert.id}
                      variants={fadeUp}
                      custom={i}
                      className="glass flex items-start gap-3 sm:gap-4 rounded-xl p-3 sm:p-4"
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        alert.severity === 'critical' ? 'bg-danger-500/15 text-danger-400'
                        : alert.severity === 'warning' ? 'bg-accent-500/15 text-accent-400'
                        : 'bg-blue-500/15 text-blue-400'
                      }`}>
                        <Icon size={20} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`badge ${severity.badgeClass}`}>
                            {ALERT_TYPE_LABEL[alert.type]}
                          </span>
                          {cat && <span className="text-xs text-surface-500">{cat.emoji} {cat.label}</span>}
                        </div>

                        {alert.productName && (
                          <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                            <Package size={13} className="text-surface-500" />
                            {alert.productName}
                          </p>
                        )}

                        <p className="mt-0.5 text-sm text-surface-400">{alert.message}</p>

                        {alert.currentStock !== undefined && alert.minStock !== undefined && (
                          <div className="mt-2 flex items-center gap-2">
                            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-700">
                              <div
                                className={`h-full rounded-full ${
                                  alert.severity === 'critical' ? 'bg-danger-500' : 'bg-accent-500'
                                }`}
                                style={{ width: `${Math.min((alert.currentStock / alert.minStock) * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs text-surface-500">
                              {alert.currentStock} / {alert.minStock}
                            </span>
                          </div>
                        )}
                      </div>

                      <span className="shrink-0 text-xs text-surface-600 hidden sm:block">{formatTimeAgo(alert.timestamp)}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          )}
        </div>
      ))}

      {/* Restock suggestion */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-5">
        <h3 className="mb-3 text-sm font-semibold text-surface-300 flex items-center gap-2">
          <RefreshCw size={16} className="text-primary-400" /> Sugerencia de Reposición
        </h3>
        <p className="text-sm text-surface-400 mb-3">
          Basado en tus niveles de stock actuales, estos productos necesitan reposición pronto:
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {products
            .filter((p) => p.stock <= p.minStock)
            .sort((a, b) => a.stock - b.stock)
            .map((p) => {
              const cat = CATEGORY_MAP[p.category];
              return (
                <div key={p.id} className="flex items-center gap-2 rounded-lg bg-surface-800/50 px-3 py-2">
                  <span>{cat?.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm text-white">{p.name}</p>
                    <p className="text-xs text-surface-500">
                      {p.stock} en stock · Min: {p.minStock} · Proveedor: {p.supplier}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </motion.div>
    </div>
  );
}
