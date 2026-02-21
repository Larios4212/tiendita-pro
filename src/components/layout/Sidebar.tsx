import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, ShoppingCart, Bell,
  ChevronLeft, ChevronRight, X,
} from 'lucide-react';
import { Logo } from '@/components/ui';
import { useAppStore } from '@/store/appStore';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/inventory', icon: Package, label: 'Inventario' },
  { to: '/pos', icon: ShoppingCart, label: 'Punto de Venta' },
  { to: '/alerts', icon: Bell, label: 'Alertas' },
];

export default function Sidebar({ mobileOpen, onMobileClose }: { mobileOpen?: boolean; onMobileClose?: () => void }) {
  const { sidebarOpen, toggleSidebar, alerts } = useAppStore();
  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;

  const sidebarContent = (isDesktop: boolean) => {
    const expanded = isDesktop ? sidebarOpen : true;
    return (
      <>
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 px-4">
          <Logo size="sm" withText={expanded} />
          {!isDesktop && (
            <button onClick={onMobileClose} className="ml-auto rounded-lg p-1.5 text-surface-400 hover:text-white lg:hidden">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onMobileClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary-500/15 text-primary-400'
                    : 'text-surface-400 hover:bg-surface-800 hover:text-white'
                }`
              }
            >
              <item.icon size={20} className="shrink-0" />
              {expanded && <span>{item.label}</span>}

              {/* Alert badge on Bell */}
              {item.to === '/alerts' && criticalCount > 0 && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-danger-500 text-[10px] font-bold text-white">
                  {criticalCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        {expanded && (
          <div className="border-t border-surface-800 p-4">
            <p className="text-xs text-surface-500">TienditaPro v1.0</p>
            <p className="text-[10px] text-surface-600">Demo · No real data</p>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 72 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative hidden lg:flex h-screen shrink-0 flex-col border-r border-surface-800 bg-surface-900/95"
      >
        {sidebarContent(true)}

        {/* Toggle */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-surface-700 bg-surface-800 text-surface-400 shadow-lg transition hover:text-white"
        >
          {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </motion.aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-surface-800 bg-surface-900 lg:hidden"
            >
              {sidebarContent(false)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
