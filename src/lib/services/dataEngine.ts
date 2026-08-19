import { Product, Order, Category, Coupon, StoreSettings, Customer, InventoryVariant } from '@/types';
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_CATEGORIES } from '@/data/mockData';

const PRODUCTS_KEY = 'tatheer_products_db';
const ORDERS_KEY = 'tatheer_orders_db';
const CATEGORIES_KEY = 'tatheer_categories_db';
const COUPONS_KEY = 'tatheer_coupons_db';
const SETTINGS_KEY = 'tatheer_settings_db';
const STOCK_COUNTS_KEY = 'tatheer_stock_counts_db';

const DEFAULT_COUPONS: Coupon[] = [
  { id: 'coup-1', code: 'PESHAWAR10', discount: 10, active: true, usageCount: 42, validUntil: '2027-12-31' },
  { id: 'coup-2', code: 'TATHEER15', discount: 15, minOrder: 8000, active: true, usageCount: 18, validUntil: '2027-12-31' },
  { id: 'coup-3', code: 'ROYAL20', discount: 20, minOrder: 15000, active: true, usageCount: 7, validUntil: '2027-12-31' },
];

const DEFAULT_SETTINGS: StoreSettings = {
  announcement: 'Authentic Handcrafted Peshawari Chappal • Direct from Peshawar',
  phone: '+92 300 9876543',
  email: 'concierge@tatheerchappalz.com',
  address: 'Namak Mandi, Opposite Jahangirpura, Peshawar, KP, Pakistan',
  freeThreshold: 5000,
  codFee: 300,
};

// In-memory fallbacks for SSR
let memoryProducts: Product[] = [...MOCK_PRODUCTS];
let memoryOrders: Order[] = [...MOCK_ORDERS];
let memoryCategories: Category[] = [...MOCK_CATEGORIES];
let memoryCoupons: Coupon[] = [...DEFAULT_COUPONS];
let memorySettings: StoreSettings = { ...DEFAULT_SETTINGS };
let memoryStockCounts: Record<string, number> = {};

function safeGetStorage<T>(key: string, defaultVal: T): T {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(item);
  } catch {
    return defaultVal;
  }
}

function safeSetStorage<T>(key: string, val: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error(`Failed to write key ${key} to storage:`, e);
  }
}

function emitEvent(eventName: string): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(eventName));
  }
}

export const dataEngine = {
  // ──────────────────────────────────────────────
  // 1. PRODUCTS CRUD & STOCK
  // ──────────────────────────────────────────────
  getProducts(): Product[] {
    const list = safeGetStorage<Product[]>(PRODUCTS_KEY, memoryProducts);
    memoryProducts = list;
    return list;
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
    safeSetStorage(PRODUCTS_KEY, updated);
    emitEvent('tatheer_products_updated');
    return newProduct;
  },

  updateProduct(id: string, updates: Partial<Product>): Product {
    const products = this.getProducts();
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    memoryProducts = updated;
    safeSetStorage(PRODUCTS_KEY, updated);
    emitEvent('tatheer_products_updated');
    const found = updated.find((p) => p.id === id);
    if (!found) throw new Error(`Product with ID ${id} not found`);
    return found;
  },

  deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const updated = products.filter((p) => p.id !== id);
    memoryProducts = updated;
    safeSetStorage(PRODUCTS_KEY, updated);
    emitEvent('tatheer_products_updated');
    return true;
  },

  // ──────────────────────────────────────────────
  // 2. CATEGORIES MANAGEMENT
  // ──────────────────────────────────────────────
  getCategories(): Category[] {
    const categories = safeGetStorage<Category[]>(CATEGORIES_KEY, memoryCategories);
    const products = this.getProducts();

    // Compute dynamic item count per category
    const withCounts = categories.map((cat) => {
      const count = products.filter(
        (p) => p.categorySlug === cat.slug || p.category.toLowerCase() === cat.name.toLowerCase()
      ).length;
      return { ...cat, itemCount: count };
    });

    memoryCategories = withCounts;
    return withCounts;
  },

  getCategoryBySlug(slug: string): Category | null {
    const categories = this.getCategories();
    return categories.find((c) => c.slug === slug) || null;
  },

  createCategory(category: Omit<Category, 'id' | 'itemCount'>): Category {
    const current = safeGetStorage<Category[]>(CATEGORIES_KEY, memoryCategories);
    const newCategory: Category = {
      ...category,
      id: `cat-${Date.now()}`,
      itemCount: 0,
    };
    const updated = [...current, newCategory];
    memoryCategories = updated;
    safeSetStorage(CATEGORIES_KEY, updated);
    emitEvent('tatheer_categories_updated');
    return newCategory;
  },

  updateCategory(id: string, updates: Partial<Category>): Category {
    const current = safeGetStorage<Category[]>(CATEGORIES_KEY, memoryCategories);
    const updated = current.map((c) => (c.id === id ? { ...c, ...updates } : c));
    memoryCategories = updated;
    safeSetStorage(CATEGORIES_KEY, updated);
    emitEvent('tatheer_categories_updated');
    const found = updated.find((c) => c.id === id);
    if (!found) throw new Error(`Category ${id} not found`);
    return found;
  },

  deleteCategory(id: string): boolean {
    const current = safeGetStorage<Category[]>(CATEGORIES_KEY, memoryCategories);
    const updated = current.filter((c) => c.id !== id);
    memoryCategories = updated;
    safeSetStorage(CATEGORIES_KEY, updated);
    emitEvent('tatheer_categories_updated');
    return true;
  },

  // ──────────────────────────────────────────────
  // 3. COUPON PROMOTIONS ENGINE
  // ──────────────────────────────────────────────
  getCoupons(): Coupon[] {
    const list = safeGetStorage<Coupon[]>(COUPONS_KEY, memoryCoupons);
    memoryCoupons = list;
    return list;
  },

  getCouponByCode(code: string): Coupon | null {
    const clean = code.trim().toUpperCase();
    const coupons = this.getCoupons();
    return coupons.find((c) => c.code.toUpperCase() === clean) || null;
  },

  createCoupon(coupon: Omit<Coupon, 'id' | 'usageCount'>): Coupon {
    const current = this.getCoupons();
    const newCoupon: Coupon = {
      ...coupon,
      id: `coup-${Date.now()}`,
      code: coupon.code.trim().toUpperCase(),
      usageCount: 0,
    };
    const updated = [newCoupon, ...current];
    memoryCoupons = updated;
    safeSetStorage(COUPONS_KEY, updated);
    emitEvent('tatheer_coupons_updated');
    return newCoupon;
  },

  updateCoupon(id: string, updates: Partial<Coupon>): Coupon {
    const current = this.getCoupons();
    const updated = current.map((c) => (c.id === id ? { ...c, ...updates } : c));
    memoryCoupons = updated;
    safeSetStorage(COUPONS_KEY, updated);
    emitEvent('tatheer_coupons_updated');
    const found = updated.find((c) => c.id === id);
    if (!found) throw new Error(`Coupon ${id} not found`);
    return found;
  },

  deleteCoupon(id: string): boolean {
    const current = this.getCoupons();
    const updated = current.filter((c) => c.id !== id);
    memoryCoupons = updated;
    safeSetStorage(COUPONS_KEY, updated);
    emitEvent('tatheer_coupons_updated');
    return true;
  },

  incrementCouponUsage(code: string): void {
    const clean = code.trim().toUpperCase();
    const current = this.getCoupons();
    const updated = current.map((c) =>
      c.code.toUpperCase() === clean ? { ...c, usageCount: (c.usageCount || 0) + 1 } : c
    );
    memoryCoupons = updated;
    safeSetStorage(COUPONS_KEY, updated);
    emitEvent('tatheer_coupons_updated');
  },

  // ──────────────────────────────────────────────
  // 4. STOREFRONT SETTINGS
  // ──────────────────────────────────────────────
  getSettings(): StoreSettings {
    const settings = safeGetStorage<StoreSettings>(SETTINGS_KEY, memorySettings);
    memorySettings = settings;
    return settings;
  },

  updateSettings(updates: Partial<StoreSettings>): StoreSettings {
    const current = this.getSettings();
    const updated: StoreSettings = { ...current, ...updates };
    memorySettings = updated;
    safeSetStorage(SETTINGS_KEY, updated);
    emitEvent('tatheer_settings_updated');
    return updated;
  },

  // ──────────────────────────────────────────────
  // 5. ORDERS & FULFILLMENT MANAGEMENT
  // ──────────────────────────────────────────────
  getOrders(): Order[] {
    const list = safeGetStorage<Order[]>(ORDERS_KEY, memoryOrders);
    memoryOrders = list;
    return list;
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
      timeline: order.timeline || [
        { title: 'Order Placed', date: new Date().toLocaleString(), completed: true },
        { title: 'Artisan Assembly', date: 'In Progress', completed: false },
        { title: 'Courier Dispatch', date: 'Pending', completed: false },
        { title: 'Delivered', date: 'Expected within 2-4 business days', completed: false },
      ],
    };
    const updated = [newOrder, ...orders];
    memoryOrders = updated;
    safeSetStorage(ORDERS_KEY, updated);
    emitEvent('tatheer_orders_updated');

    // Deduct variant stock from products
    try {
      order.items.forEach((item) => {
        const product = this.getProducts().find(
          (p) => (item.productId && p.id === item.productId) || p.name === item.productName
        );
        if (product) {
          const targetSize = item.size ?? item.selectedSize;
          this.adjustStock(product.id, targetSize, -item.quantity);
        }
      });
    } catch (e) {
      console.error('Inventory deduction notice:', e);
    }

    return newOrder;
  },

  updateOrderStatus(orderId: string, status: Order['status']): Order {
    const orders = this.getOrders();
    const updated = orders.map((o) => {
      if (o.id === orderId || o.orderNumber === orderId) {
        const timeline = o.timeline ? [...o.timeline] : [];
        if (status === 'Dispatched' && timeline.length >= 3) {
          timeline[1].completed = true;
          timeline[2].completed = true;
        } else if (status === 'Delivered' && timeline.length >= 4) {
          timeline.forEach((t) => (t.completed = true));
        }
        return { ...o, status, timeline };
      }
      return o;
    });
    memoryOrders = updated;
    safeSetStorage(ORDERS_KEY, updated);
    emitEvent('tatheer_orders_updated');
    const found = updated.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (!found) throw new Error(`Order ${orderId} not found`);
    return found;
  },

  // ──────────────────────────────────────────────
  // 6. INVENTORY VARIANT CONTROL
  // ──────────────────────────────────────────────
  getStockCounts(): Record<string, number> {
    const counts = safeGetStorage<Record<string, number>>(STOCK_COUNTS_KEY, memoryStockCounts);
    memoryStockCounts = counts;
    return counts;
  },

  getAllInventoryVariants(): InventoryVariant[] {
    const products = this.getProducts();
    const stockCounts = this.getStockCounts();
    const variants: InventoryVariant[] = [];

    products.forEach((p) => {
      const code = p.slug.split('-').map((s) => s[0]?.toUpperCase()).join('').slice(0, 4) || 'TC';
      p.sizes.forEach((s) => {
        const sku = `TC-${code}-EU${s.size}`;
        const count = stockCounts[sku] !== undefined ? stockCounts[sku] : s.inStock ? (s.size === 42 ? 15 : 8) : 0;
        variants.push({
          productId: p.id,
          productName: p.name,
          category: p.category,
          size: s.size,
          color: p.colors[0]?.name || 'Natural Tan',
          sku,
          inStock: count > 0,
          stockCount: count,
        });
      });
    });

    return variants;
  },

  adjustStock(productId: string, size: number, deltaOrCount: number, isAbsolute = false): void {
    const product = this.getProductById(productId);
    if (!product) return;

    const code = product.slug.split('-').map((s) => s[0]?.toUpperCase()).join('').slice(0, 4) || 'TC';
    const sku = `TC-${code}-EU${size}`;
    const stockCounts = this.getStockCounts();
    const current = stockCounts[sku] !== undefined ? stockCounts[sku] : 8;
    const newCount = isAbsolute ? Math.max(0, deltaOrCount) : Math.max(0, current + deltaOrCount);

    stockCounts[sku] = newCount;
    memoryStockCounts = stockCounts;
    safeSetStorage(STOCK_COUNTS_KEY, stockCounts);

    // Update product size inStock boolean
    const updatedSizes = product.sizes.map((s) =>
      s.size === size ? { ...s, inStock: newCount > 0 } : s
    );
    this.updateProduct(productId, { sizes: updatedSizes });
  },

  // ──────────────────────────────────────────────
  // 7. PATRON CUSTOMERS CRM
  // ──────────────────────────────────────────────
  getCustomers(): Customer[] {
    const orders = this.getOrders();
    const customerMap: Record<string, Customer> = {};

    // Seed default patrons if orders are sparse
    const seedPatrons: Customer[] = [
      {
        id: 'cust-seed-1',
        name: 'Shahid Khan',
        email: 'shahid.khan@example.com',
        phone: '+92 301 8877665',
        city: 'Peshawar',
        ordersCount: 4,
        totalSpent: 56996,
        role: 'Royal Patron',
        lastOrderDate: '2026-08-10',
      },
      {
        id: 'cust-seed-2',
        name: 'Tariq Mehmood',
        email: 'tariq@example.com',
        phone: '+92 300 1234567',
        city: 'Lahore',
        ordersCount: 2,
        totalSpent: 28498,
        role: 'Verified Patron',
        lastOrderDate: '2026-07-28',
      },
      {
        id: 'cust-seed-3',
        name: 'Bilal Ahmed',
        email: 'bilal.ahmed@example.com',
        phone: '+92 321 9988776',
        city: 'Islamabad',
        ordersCount: 3,
        totalSpent: 42997,
        role: 'Verified Patron',
        lastOrderDate: '2026-07-15',
      },
      {
        id: 'cust-seed-4',
        name: 'Hamza Farooq',
        email: 'hamza@example.com',
        phone: '+92 333 4455667',
        city: 'Karachi',
        ordersCount: 1,
        totalSpent: 13999,
        role: 'Patron',
        lastOrderDate: '2026-06-30',
      },
    ];

    seedPatrons.forEach((p) => {
      customerMap[p.email.toLowerCase()] = p;
    });

    // Aggregate real orders placed by patrons
    orders.forEach((o) => {
      const email = (o.userId || o.shippingAddress?.fullName?.toLowerCase().replace(/\s+/g, '.') + '@customer.com' || 'patron@example.com').toLowerCase();
      const existing = customerMap[email];
      const orderTotal = o.status !== 'Cancelled' ? o.total : 0;

      if (existing) {
        existing.ordersCount += 1;
        existing.totalSpent += orderTotal;
        existing.lastOrderDate = o.date || existing.lastOrderDate;
        existing.role = existing.totalSpent >= 50000 ? 'Royal Patron' : existing.totalSpent >= 20000 ? 'Verified Patron' : 'Patron';
      } else {
        customerMap[email] = {
          id: `cust-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          name: o.shippingAddress?.fullName || 'Valued Patron',
          email,
          phone: o.shippingAddress?.phone || '+92 300 0000000',
          city: o.shippingAddress?.city || 'Peshawar',
          ordersCount: 1,
          totalSpent: orderTotal,
          role: orderTotal >= 50000 ? 'Royal Patron' : orderTotal >= 20000 ? 'Verified Patron' : 'Patron',
          lastOrderDate: o.date,
        };
      }
    });

    return Object.values(customerMap);
  },
};
