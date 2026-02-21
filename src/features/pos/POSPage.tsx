import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Plus, Minus, Trash2, CreditCard,
  CheckCircle, Search, Tag, X,
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { CATEGORY_MAP, PAYMENT_METHODS } from '@/utils/constants';
import { formatCurrency } from '@/utils/formatters';
import { useDebounce } from '@/hooks';
import { Modal } from '@/components/ui';
import { PaymentMethod } from '@/utils/types';

export default function POSPage() {
  const { products, cart, cartDiscount, addToCart, removeFromCart, updateCartQty, setCartDiscount, clearCart, completeSale } = useAppStore();
  const [search, setSearch] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('cash');
  const [showPayModal, setShowPayModal] = useState(false);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 200);

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch) return products.filter((p) => p.stock > 0).slice(0, 20);
    const q = debouncedSearch.toLowerCase();
    return products.filter((p) =>
      p.stock > 0 && (p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)),
    );
  }, [products, debouncedSearch]);

  const subtotal = cart.reduce((s, i) => s + i.subtotal, 0);
  const total = Math.max(0, subtotal - cartDiscount);

  function handleCompleteSale() {
    completeSale(selectedPayment);
    setShowPayModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  }

  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* ── LEFT: Product Search ── */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin">
        <div className="mb-4 sm:mb-5">
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingCart size={24} className="text-primary-400" /> Punto de Venta
          </h1>
          <p className="text-sm text-surface-400">Busca productos y agrégalos al carrito</p>
        </div>

        {/* Search */}
        <div className="relative mb-4 sm:mb-5 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o SKU..."
            className="w-full rounded-xl border border-surface-700/60 bg-surface-800/80 py-3 pl-9 pr-4 text-sm text-white placeholder-surface-500 outline-none transition focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30"
            autoFocus
          />
        </div>

        {/* Product grid */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <AnimatePresence>
            {filteredProducts.map((p) => {
              const cat = CATEGORY_MAP[p.category];
              const inCart = cart.find((c) => c.productId === p.id);
              return (
                <motion.button
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => addToCart(p)}
                  className={`glass group relative rounded-xl p-4 text-left transition-all hover:border-primary-500/30 active:scale-[0.98] ${
                    inCart ? 'ring-1 ring-primary-500/30' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-2xl">{cat?.emoji}</span>
                    <span className="text-lg font-bold text-primary-400">{formatCurrency(p.salePrice)}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">{p.name}</p>
                  <p className="text-xs text-surface-500">Stock: {p.stock} {p.unit}</p>

                  {inCart && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
                      {inCart.quantity}
                    </span>
                  )}

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-primary-500/10 opacity-0 transition group-hover:opacity-100">
                    <Plus size={20} className="text-primary-400" />
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center text-surface-500">
            No se encontraron productos disponibles.
          </div>
        )}
      </div>

      {/* ── RIGHT: Cart (Desktop) ── */}
      <div className="hidden lg:block w-96 shrink-0 border-l border-surface-800 bg-surface-900/95">
        <div className="flex h-full flex-col">
          {/* Cart header */}
          <div className="flex items-center justify-between border-b border-surface-800 px-5 py-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShoppingCart size={18} className="text-primary-400" />
              Carrito
              {cart.length > 0 && (
                <span className="ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-500/20 px-1 text-xs font-semibold text-primary-400">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </h2>
            {cart.length > 0 && (
              <button onClick={clearCart} className="text-xs text-surface-500 hover:text-danger-400 transition">
                Vaciar
              </button>
            )}
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-surface-500">
                <ShoppingCart size={40} className="mb-3 opacity-30" />
                <p className="text-sm">Carrito vacío</p>
                <p className="text-xs">Agrega productos buscando arriba</p>
              </div>
            ) : (
              <div className="space-y-2">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.productId}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-3 rounded-xl bg-surface-800/60 px-3 py-2.5"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-white">{item.productName}</p>
                        <p className="text-xs text-surface-500">{formatCurrency(item.unitPrice)} c/u</p>
                      </div>

                      {/* Qty controls */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateCartQty(item.productId, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-700 text-surface-400 transition hover:bg-surface-600 hover:text-white"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(item.productId, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-700 text-surface-400 transition hover:bg-surface-600 hover:text-white"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <span className="w-16 text-right text-sm font-semibold text-primary-400">
                        {formatCurrency(item.subtotal)}
                      </span>

                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-surface-600 transition hover:text-danger-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Cart footer */}
          {cart.length > 0 && (
            <div className="border-t border-surface-800 p-4 space-y-3">
              {/* Discount */}
              <div className="flex items-center gap-2">
                <Tag size={14} className="text-accent-400" />
                <span className="text-xs text-surface-400">Descuento:</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-surface-500">$</span>
                  <input
                    type="number"
                    min={0}
                    value={cartDiscount || ''}
                    onChange={(e) => setCartDiscount(Number(e.target.value))}
                    placeholder="0"
                    className="w-16 rounded-lg border border-surface-700 bg-surface-800 px-2 py-1 text-sm text-white outline-none focus:border-accent-500/50"
                  />
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-surface-400">Subtotal</span>
                  <span className="text-white">{formatCurrency(subtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-accent-400">Descuento</span>
                    <span className="text-accent-400">-{formatCurrency(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-surface-700 pt-2">
                  <span className="text-base font-bold text-white">Total</span>
                  <span className="text-xl font-bold text-primary-400">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Pay button */}
              <button
                onClick={() => setShowPayModal(true)}
                className="btn-primary w-full rounded-xl py-3.5 text-base font-semibold flex items-center justify-center gap-2"
              >
                <CreditCard size={18} /> Cobrar {formatCurrency(total)}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile Cart Overlay ── */}
      <AnimatePresence>
        {mobileCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileCartOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] rounded-t-2xl border-t border-surface-700 bg-surface-900 lg:hidden"
            >
              <div className="flex h-full flex-col">
                {/* Cart header */}
                <div className="flex items-center justify-between border-b border-surface-800 px-5 py-3">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShoppingCart size={18} className="text-primary-400" />
                    Carrito
                    {cart.length > 0 && (
                      <span className="ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-500/20 px-1 text-xs font-semibold text-primary-400">
                        {cart.reduce((s, i) => s + i.quantity, 0)}
                      </span>
                    )}
                  </h2>
                  <div className="flex items-center gap-3">
                    {cart.length > 0 && (
                      <button onClick={clearCart} className="text-xs text-surface-500 hover:text-danger-400 transition">Vaciar</button>
                    )}
                    <button onClick={() => setMobileCartOpen(false)} className="rounded-lg p-1 text-surface-400 hover:text-white">
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Cart items */}
                <div className="flex-1 overflow-y-auto p-4 scrollbar-thin max-h-[40vh]">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-surface-500">
                      <ShoppingCart size={32} className="mb-2 opacity-30" />
                      <p className="text-sm">Carrito vacío</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {cart.map((item) => (
                        <div key={item.productId} className="flex items-center gap-3 rounded-xl bg-surface-800/60 px-3 py-2.5">
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium text-white">{item.productName}</p>
                            <p className="text-xs text-surface-500">{formatCurrency(item.unitPrice)} c/u</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => updateCartQty(item.productId, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-700 text-surface-400">
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold text-white">{item.quantity}</span>
                            <button onClick={() => updateCartQty(item.productId, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-700 text-surface-400">
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="w-16 text-right text-sm font-semibold text-primary-400">{formatCurrency(item.subtotal)}</span>
                          <button onClick={() => removeFromCart(item.productId)} className="text-surface-600 hover:text-danger-400">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cart footer */}
                {cart.length > 0 && (
                  <div className="border-t border-surface-800 p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-accent-400" />
                      <span className="text-xs text-surface-400">Descuento:</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-surface-500">$</span>
                        <input type="number" min={0} value={cartDiscount || ''} onChange={(e) => setCartDiscount(Number(e.target.value))} placeholder="0" className="w-16 rounded-lg border border-surface-700 bg-surface-800 px-2 py-1 text-sm text-white outline-none focus:border-accent-500/50" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-surface-700 pt-2">
                      <span className="text-base font-bold text-white">Total</span>
                      <span className="text-xl font-bold text-primary-400">{formatCurrency(total)}</span>
                    </div>
                    <button onClick={() => { setShowPayModal(true); setMobileCartOpen(false); }} className="btn-primary w-full rounded-xl py-3.5 text-base font-semibold flex items-center justify-center gap-2">
                      <CreditCard size={18} /> Cobrar {formatCurrency(total)}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile floating cart button */}
      {cart.length > 0 && !mobileCartOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setMobileCartOpen(true)}
          className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-2xl btn-primary px-5 py-3.5 shadow-2xl lg:hidden"
        >
          <ShoppingCart size={20} />
          <span className="font-bold">{formatCurrency(total)}</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">
            {cart.reduce((s, i) => s + i.quantity, 0)}
          </span>
        </motion.button>
      )}

      {/* ── Payment Modal ── */}
      <Modal open={showPayModal} onClose={() => setShowPayModal(false)} title="Confirmar Pago">
        <div className="space-y-5">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-400">{formatCurrency(total)}</p>
            <p className="text-sm text-surface-400">{cart.reduce((s, i) => s + i.quantity, 0)} producto(s)</p>
          </div>

          {/* Payment method selection */}
          <div>
            <p className="mb-2 text-sm font-medium text-surface-300">Método de pago</p>
            <div className="grid grid-cols-3 gap-2">
              {PAYMENT_METHODS.map((pm) => (
                <button
                  key={pm.id}
                  onClick={() => setSelectedPayment(pm.id)}
                  className={`rounded-xl border p-3 text-center transition ${
                    selectedPayment === pm.id
                      ? 'border-primary-500/50 bg-primary-500/10 text-primary-400'
                      : 'border-surface-700 bg-surface-800/60 text-surface-400 hover:border-surface-600'
                  }`}
                >
                  <span className="text-xl block">{pm.emoji}</span>
                  <span className="text-xs mt-1 block">{pm.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCompleteSale}
            className="btn-primary w-full rounded-xl py-3.5 text-base font-semibold flex items-center justify-center gap-2"
          >
            <CheckCircle size={18} /> Confirmar Venta
          </button>
        </div>
      </Modal>

      {/* ── Success Toast ── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-primary-500/30 bg-primary-500/20 px-6 py-4 shadow-2xl backdrop-blur-sm"
          >
            <CheckCircle size={24} className="text-primary-400" />
            <div>
              <p className="text-sm font-semibold text-white">¡Venta registrada!</p>
              <p className="text-xs text-primary-300">El inventario se ha actualizado</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
