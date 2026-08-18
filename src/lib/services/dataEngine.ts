import { Product, Order } from '@/types';
import { MOCK_PRODUCTS, MOCK_ORDERS } from '@/data/mockData';

const PRODUCTS_KEY = 'tatheer_products_db';
const ORDERS_KEY = 'tatheer_orders_db';

// In-memory fallback if localStorage not available (SSR)
let memoryProducts: Product[] = [...MOCK_PRODUCTS];
let memoryOrders: Order[] = [...MOCK_ORDERS];

export const dataEngine = {
  // ──────────────────────────────────────────────
  // PRODUCTS CRUD
  // ──────────────────────────────────────────────
  getProducts(): Product[] {
    if (typeof window === 'undefined') {
      return memoryProducts;
    }
    try {
      const stored = localStorage.getItem(PRODUCTS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          memoryProducts = parsed;
          return parsed;
        }
      }
      // Initialize with default mock products
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(MOCK_PRODUCTS));
      return MOCK_PRODUCTS;
    } catch {
      return memoryProducts;
    }
  },

  getProductBySlug(slug: string): Product | null {
    const products = this.getProducts();
    return products.find((p) => p.slug === slug) || null;
  },

  getProductById(id: string): Product | null {
    const products = this.getProducts();
    return products.find((p) => p.id === id) || null;
  },

  createProduct(product: Omit<Product, 'id'>): Product {
    const products = this.getProducts();
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...product,
      id: newId,
    };
    const updated = [newProduct, ...products];
    memoryProducts = updated;
    if (typeof window !== 'undefined') {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('tatheer_products_updated'));
    }
    return newProduct;
  },

  updateProduct(id: string, updates: Partial<Product>): Product {
    const products = this.getProducts();
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    memoryProducts = updated;
    if (typeof window !== 'undefined') {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('tatheer_products_updated'));
    }
    const found = updated.find((p) => p.id === id);
    if (!found) throw new Error(`Product with ID ${id} not found`);
    return found;
  },

  deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const updated = products.filter((p) => p.id !== id);
    memoryProducts = updated;
    if (typeof window !== 'undefined') {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('tatheer_products_updated'));
    }
    return true;
  },

  // ──────────────────────────────────────────────
  // ORDERS MANAGEMENT
  // ──────────────────────────────────────────────
  getOrders(): Order[] {
    if (typeof window === 'undefined') {
      return memoryOrders;
    }
    try {
      const stored = localStorage.getItem(ORDERS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          memoryOrders = parsed;
          return parsed;
        }
      }
      localStorage.setItem(ORDERS_KEY, JSON.stringify(MOCK_ORDERS));
      return MOCK_ORDERS;
    } catch {
      return memoryOrders;
    }
  },

  getOrderById(id: string): Order | null {
    const orders = this.getOrders();
    return orders.find((o) => o.id === id || o.orderNumber === id) || null;
  },

  createOrder(order: Omit<Order, 'id'>): Order {
    const orders = this.getOrders();
    const newId = `ord-${Date.now()}`;
    const newOrder: Order = {
      ...order,
      id: newId,
    };
    const updated = [newOrder, ...orders];
    memoryOrders = updated;
    if (typeof window !== 'undefined') {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('tatheer_orders_updated'));
    }

    // Deduct stock from products
    try {
      const products = this.getProducts();
      order.items.forEach((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (product) {
          const updatedSizes = product.sizes.map((s) =>
            s.size === item.selectedSize ? { ...s, inStock: true } : s
          );
          this.updateProduct(product.id, { sizes: updatedSizes });
        }
      });
    } catch (e) {
      console.error('Inventory deduction notice:', e);
    }

    return newOrder;
  },

  updateOrderStatus(orderId: string, status: Order['status']): Order {
    const orders = this.getOrders();
    const updated = orders.map((o) =>
      o.id === orderId || o.orderNumber === orderId ? { ...o, status } : o
    );
    memoryOrders = updated;
    if (typeof window !== 'undefined') {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('tatheer_orders_updated'));
    }
    const found = updated.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (!found) throw new Error(`Order ${orderId} not found`);
    return found;
  },

  // ──────────────────────────────────────────────
  // INVENTORY STOCK ADJUSTMENT
  // ──────────────────────────────────────────────
  adjustStock(productId: string, size: number, inStock: boolean) {
    const product = this.getProductById(productId);
    if (!product) return;
    const updatedSizes = product.sizes.map((s) => (s.size === size ? { ...s, inStock } : s));
    this.updateProduct(productId, { sizes: updatedSizes });
  },
};
