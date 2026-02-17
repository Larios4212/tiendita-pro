import { create } from 'zustand';
import { CartItem, Product, Sale, PaymentMethod, InventoryAlert, DashboardStats } from '@/utils/types';
import { MOCK_PRODUCTS, MOCK_SALES, generateAlerts, computeStats } from '@/services/mockData';

interface AppState {
  /* ── Data ── */
  products: Product[];
  sales: Sale[];
  alerts: InventoryAlert[];
  stats: DashboardStats;

  /* ── POS cart ── */
  cart: CartItem[];
  cartDiscount: number;

  /* ── UI ── */
  sidebarOpen: boolean;

  /* ── Actions ── */
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, qty: number) => void;
  setCartDiscount: (d: number) => void;
  clearCart: () => void;
  completeSale: (paymentMethod: PaymentMethod) => void;
  toggleSidebar: () => void;
  refreshAlerts: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  products: MOCK_PRODUCTS,
  sales: [...MOCK_SALES],
  alerts: generateAlerts(MOCK_PRODUCTS),
  stats: computeStats(MOCK_PRODUCTS, MOCK_SALES),

  cart: [],
  cartDiscount: 0,
  sidebarOpen: true,

  addToCart: (product, qty = 1) => {
    set((s) => {
      const existing = s.cart.find((i) => i.productId === product.id);
      if (existing) {
        return {
          cart: s.cart.map((i) =>
            i.productId === product.id
              ? { ...i, quantity: i.quantity + qty, subtotal: (i.quantity + qty) * i.unitPrice }
              : i,
          ),
        };
      }
      return {
        cart: [...s.cart, {
          productId: product.id,
          productName: product.name,
          quantity: qty,
          unitPrice: product.salePrice,
          subtotal: product.salePrice * qty,
        }],
      };
    });
  },

  removeFromCart: (productId) => set((s) => ({ cart: s.cart.filter((i) => i.productId !== productId) })),

  updateCartQty: (productId, qty) => {
    if (qty <= 0) { get().removeFromCart(productId); return; }
    set((s) => ({
      cart: s.cart.map((i) =>
        i.productId === productId ? { ...i, quantity: qty, subtotal: qty * i.unitPrice } : i,
      ),
    }));
  },

  setCartDiscount: (d) => set({ cartDiscount: Math.max(0, d) }),

  clearCart: () => set({ cart: [], cartDiscount: 0 }),

  completeSale: (paymentMethod) => {
    const { cart, cartDiscount, products, sales } = get();
    if (cart.length === 0) return;

    const subtotal = cart.reduce((s, i) => s + i.subtotal, 0);
    const total = Math.max(0, subtotal - cartDiscount);

    const sale: Sale = {
      id: `s${Date.now()}`,
      items: [...cart],
      subtotal,
      discount: cartDiscount,
      total,
      paymentMethod,
      timestamp: new Date().toISOString(),
    };

    // Reduce stock
    const updatedProducts = products.map((p) => {
      const cartItem = cart.find((c) => c.productId === p.id);
      return cartItem ? { ...p, stock: Math.max(0, p.stock - cartItem.quantity) } : p;
    });

    const newSales = [sale, ...sales];

    set({
      sales: newSales,
      products: updatedProducts,
      cart: [],
      cartDiscount: 0,
      alerts: generateAlerts(updatedProducts),
      stats: computeStats(updatedProducts, newSales),
    });
  },

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  refreshAlerts: () => {
    const { products } = get();
    set({ alerts: generateAlerts(products) });
  },
}));
