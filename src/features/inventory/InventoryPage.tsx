import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Filter, ArrowUpDown } from 'lucide-react';
import { SearchInput } from '@/components/ui';
import { useAppStore } from '@/store/appStore';
import { CATEGORIES, CATEGORY_MAP } from '@/utils/constants';
import { formatCurrency, getMargin, getStockLevel } from '@/utils/formatters';
import { useDebounce } from '@/hooks';
import { ProductCategory } from '@/utils/types';

type SortKey = 'name' | 'stock' | 'salePrice' | 'margin';

const STOCK_BADGE: Record<ReturnType<typeof getStockLevel>, { label: string; cls: string }> = {
  ok: { label: 'OK', cls: 'badge-success' },
  low: { label: 'Bajo', cls: 'badge-warning' },
  critical: { label: 'Crítico', cls: 'badge-danger' },
  out: { label: 'Agotado', cls: 'badge-danger' },
};

export default function InventoryPage() {
  const { products } = useAppStore();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<ProductCategory | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortAsc, setSortAsc] = useState(true);

  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    let list = [...products];

    // Category filter
    if (catFilter !== 'all') list = list.filter((p) => p.category === catFilter);

    // Search
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.supplier.toLowerCase().includes(q),
      );
    }

    // Sort
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'name': cmp = a.name.localeCompare(b.name); break;
        case 'stock': cmp = a.stock - b.stock; break;
        case 'salePrice': cmp = a.salePrice - b.salePrice; break;
        case 'margin': cmp = getMargin(a.purchasePrice, a.salePrice) - getMargin(b.purchasePrice, b.salePrice); break;
      }
      return sortAsc ? cmp : -cmp;
    });

    return list;
  }, [products, catFilter, debouncedSearch, sortKey, sortAsc]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  }

  const SortHeader = ({ label, sKey, className = '' }: { label: string; sKey: SortKey; className?: string }) => (
    <button
      onClick={() => toggleSort(sKey)}
      className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-surface-400 hover:text-white transition ${className}`}
    >
      {label}
      <ArrowUpDown size={12} className={sortKey === sKey ? 'text-primary-400' : 'text-surface-600'} />
    </button>
  );

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Package size={24} className="text-primary-400" /> Inventario
          </h1>
          <p className="text-sm text-surface-400">{products.length} productos · {filtered.length} visibles</p>
        </div>
      </div>

      {/* Filters row */}
      <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Buscar producto, SKU o proveedor..."
          className="w-full sm:max-w-sm"
        />

        {/* Category pills */}
        <div className="flex items-center gap-1 rounded-xl border border-surface-700/60 bg-surface-800/60 p-1 overflow-x-auto scrollbar-thin">
          <button
            onClick={() => setCatFilter('all')}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              catFilter === 'all' ? 'bg-primary-500/20 text-primary-300' : 'text-surface-400 hover:text-white'
            }`}
          >
            <Filter size={12} className="inline mr-1" /> Todas
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCatFilter(c.id)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                catFilter === c.id ? 'bg-primary-500/20 text-primary-300' : 'text-surface-400 hover:text-white'
              }`}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-surface-700/50 bg-surface-800/50">
                <th className="px-3 sm:px-4 py-3"><SortHeader label="Producto" sKey="name" /></th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-surface-400 hidden lg:table-cell">Categoría</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-surface-400 hidden xl:table-cell">SKU</th>
                <th className="px-3 sm:px-4 py-3"><SortHeader label="Stock" sKey="stock" /></th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-surface-400 hidden md:table-cell">P. Compra</th>
                <th className="px-3 sm:px-4 py-3"><SortHeader label="P. Venta" sKey="salePrice" /></th>
                <th className="px-3 sm:px-4 py-3 hidden sm:table-cell"><SortHeader label="Margen" sKey="margin" /></th>
                <th className="px-3 sm:px-4 py-3 text-xs font-semibold uppercase tracking-wider text-surface-400">Estado</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((p) => {
                  const margin = getMargin(p.purchasePrice, p.salePrice);
                  const level = getStockLevel(p.stock, p.minStock);
                  const badge = STOCK_BADGE[level];
                  const cat = CATEGORY_MAP[p.category];

                  return (
                    <motion.tr
                      key={p.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-surface-700/30 transition hover:bg-surface-800/40"
                    >
                      <td className="px-3 sm:px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{cat?.emoji}</span>
                          <div className="min-w-0">
                            <span className="font-medium text-white block truncate">{p.name}</span>
                            <span className="text-[10px] text-surface-500 lg:hidden">{cat?.label}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-surface-400 hidden lg:table-cell">{cat?.label}</td>
                      <td className="px-4 py-3 font-mono text-xs text-surface-500 hidden xl:table-cell">{p.sku}</td>
                      <td className="px-3 sm:px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${level === 'ok' ? 'text-white' : level === 'low' ? 'text-accent-400' : 'text-danger-400'}`}>
                            {p.stock}
                          </span>
                          <span className="text-xs text-surface-600 hidden sm:inline">/ {p.minStock} {p.unit}</span>
                        </div>
                        {/* Stock bar */}
                        <div className="mt-1 h-1 w-12 sm:w-16 overflow-hidden rounded-full bg-surface-700">
                          <div
                            className={`h-full rounded-full transition-all ${
                              level === 'ok' ? 'bg-primary-500' : level === 'low' ? 'bg-accent-500' : 'bg-danger-500'
                            }`}
                            style={{ width: `${Math.min((p.stock / (p.minStock * 3)) * 100, 100)}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-surface-400 hidden md:table-cell">{formatCurrency(p.purchasePrice)}</td>
                      <td className="px-3 sm:px-4 py-3 font-semibold text-white text-xs sm:text-sm">{formatCurrency(p.salePrice)}</td>
                      <td className="px-3 sm:px-4 py-3 hidden sm:table-cell">
                        <span className={`font-semibold ${margin >= 40 ? 'text-primary-400' : margin >= 25 ? 'text-accent-400' : 'text-danger-400'}`}>
                          {margin.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-3">
                        <span className={`badge ${badge.cls}`}>{badge.label}</span>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-surface-500">
              No se encontraron productos con esos filtros.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
