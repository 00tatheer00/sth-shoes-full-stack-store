'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, CartItem, ProductColor, Order, Category, Coupon, StoreSettings } from '@/types';
import { productService } from '@/lib/services/productService';
import { orderService } from '@/lib/services/orderService';
import { authService } from '@/lib/services/authService';
import { dataEngine } from '@/lib/services/dataEngine';

interface StoreContextType {
  // Products & Categories
  products: Product[];
  isLoadingProducts: boolean;
  refreshProducts: () => Promise<void>;
  categories: Category[];
  refreshCategories: () => Promise<void>;

  // Orders
  orders: Order[];
  refreshOrders: () => Promise<void>;

  // Coupons
  coupons: Coupon[];
  refreshCoupons: () => Promise<void>;

  // Storefront Settings
  storeSettings: StoreSettings;
  refreshSettings: () => Promise<void>;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, selectedColor: ProductColor, selectedSize: number, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  subtotal: number;
  shippingFee: number;
  couponCode: string;
  discount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  total: number;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Search Launcher Modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Toast Notification
  toastMessage: string | null;
  showToast: (message: string) => void;

  // User Auth State
  currentUser: any | null;
  setCurrentUser: (user: any | null) => void;
  logoutUser: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(dataEngine.getSettings());
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  const refreshProducts = useCallback(async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (e) {
      console.error('Failed refreshing products:', e);
    }
  }, []);

  const refreshCategories = useCallback(async () => {
    try {
      const data = dataEngine.getCategories();
      setCategories(data);
    } catch (e) {
      console.error('Failed refreshing categories:', e);
    }
  }, []);

  const refreshOrders = useCallback(async () => {
    try {
      const data = await orderService.getOrders();
      setOrders(data);
    } catch (e) {
      console.error('Failed refreshing orders:', e);
    }
  }, []);

  const refreshCoupons = useCallback(async () => {
    try {
      const data = dataEngine.getCoupons();
      setCoupons(data);
    } catch (e) {
      console.error('Failed refreshing coupons:', e);
    }
  }, []);

  const refreshSettings = useCallback(async () => {
    try {
      const data = dataEngine.getSettings();
      setStoreSettings(data);
    } catch (e) {
      console.error('Failed refreshing settings:', e);
    }
  }, []);

  // Fetch real data & check user auth session on mount
  useEffect(() => {
    async function initStore() {
      try {
        setIsLoadingProducts(true);
        await refreshProducts();
        await refreshCategories();
        await refreshOrders();
        await refreshCoupons();
        await refreshSettings();

        // Check Auth Session
        const session = await authService.getSession();
        if (session?.user) {
          setCurrentUser(session.user);
        }
      } catch (e) {
        console.error('Store init error:', e);
      } finally {
        setIsLoadingProducts(false);
      }
    }
    initStore();

    // Listen to live dataEngine events
    const handleProductsUpdate = () => {
      refreshProducts();
      refreshCategories();
    };
    const handleOrdersUpdate = () => refreshOrders();
    const handleCategoriesUpdate = () => refreshCategories();
    const handleCouponsUpdate = () => refreshCoupons();
    const handleSettingsUpdate = () => refreshSettings();

    if (typeof window !== 'undefined') {
      window.addEventListener('tatheer_products_updated', handleProductsUpdate);
      window.addEventListener('tatheer_orders_updated', handleOrdersUpdate);
      window.addEventListener('tatheer_categories_updated', handleCategoriesUpdate);
      window.addEventListener('tatheer_coupons_updated', handleCouponsUpdate);
      window.addEventListener('tatheer_settings_updated', handleSettingsUpdate);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('tatheer_products_updated', handleProductsUpdate);
        window.removeEventListener('tatheer_orders_updated', handleOrdersUpdate);
        window.removeEventListener('tatheer_categories_updated', handleCategoriesUpdate);
        window.removeEventListener('tatheer_coupons_updated', handleCouponsUpdate);
        window.removeEventListener('tatheer_settings_updated', handleSettingsUpdate);
      }
    };
  }, [refreshProducts, refreshCategories, refreshOrders, refreshCoupons, refreshSettings]);

  // Persistent local storage sync for cart & wishlist
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('tatheer_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('tatheer_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error('Failed loading local storage', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('tatheer_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed saving cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('tatheer_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed saving wishlist', e);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product: Product, selectedColor: ProductColor, selectedSize: number, quantity = 1) => {
    setCart((prev) => {
      const cartItemId = `${product.id}-${selectedColor.name}-${selectedSize}`;
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedColor,
          selectedSize,
          quantity,
        },
      ];
    });
    showToast(`Added ${product.name} (EU ${selectedSize}) to bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from bag');
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountPercent(0);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tatheer_cart');
    }
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from Wishlist`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved ${product.name} to Wishlist`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.product.salePrice ?? item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const match = dataEngine.getCouponByCode(clean);

    if (!match) {
      return { success: false, message: 'Invalid coupon code. Try PESHAWAR10 or TATHEER15' };
    }

    if (!match.active) {
      return { success: false, message: `Coupon ${clean} is currently disabled.` };
    }

    if (match.minOrder && subtotal < match.minOrder) {
      return {
        success: false,
        message: `Coupon ${clean} requires minimum order of Rs. ${match.minOrder.toLocaleString()}`,
      };
    }

    if (match.validUntil && new Date(match.validUntil) < new Date()) {
      return { success: false, message: `Coupon ${clean} has expired.` };
    }

    setCouponCode(clean);
    setDiscountPercent(match.discount);
    showToast(`Coupon ${clean} applied (${match.discount}% OFF)`);
    return { success: true, message: `${match.discount}% Discount applied successfully!` };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
    showToast('Coupon removed');
  };

  const logoutUser = async () => {
    await authService.logout();
    setCurrentUser(null);
    showToast('Signed out of Tatheer account');
  };

  const freeThreshold = storeSettings.freeThreshold || 5000;
  const codFee = storeSettings.codFee || 300;
  const shippingFee = subtotal >= freeThreshold || subtotal === 0 ? 0 : codFee;
  const discount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discount + shippingFee);

  return (
    <StoreContext.Provider
      value={{
        products,
        isLoadingProducts,
        refreshProducts,
        categories,
        refreshCategories,
        orders,
        refreshOrders,
        coupons,
        refreshCoupons,
        storeSettings,
        refreshSettings,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        subtotal,
        shippingFee,
        couponCode,
        discount,
        applyCoupon,
        removeCoupon,
        total,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isSearchOpen,
        setIsSearchOpen,
        toastMessage,
        showToast,
        currentUser,
        setCurrentUser,
        logoutUser,
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl border border-slate-700 shadow-2xl flex items-center gap-3 transition-all duration-300 font-sans">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
