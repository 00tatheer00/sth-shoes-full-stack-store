export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSize {
  size: number; // e.g., 40, 41, 42, 43, 44, 45, 46
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number; // in PKR
  salePrice?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  featuredImage: string;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  shortDescription: string;
  description: string;
  materials: string[];
  craftingDetails: string[];
  soleType: string;
  leatherType: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: number;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface CraftStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
  image: string;
}

export interface Address {
  id: string;
  title?: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

export interface OrderItem {
  productId?: string;
  productName: string;
  color: string;
  size: number;
  quantity: number;
  price: number;
  image: string;
  selectedColor?: ProductColor;
  selectedSize?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  date: string;
  status: 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled';
  timeline?: { title: string; date: string; completed: boolean }[];
  items: OrderItem[];
  subtotal: number;
  shipping?: number;
  shippingFee?: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus?: string;
  shippingAddress: Address;
  trackingNumber: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number; // e.g. 10 for 10%
  minOrder?: number;
  active: boolean;
  usageCount: number;
  validUntil: string;
}

export interface StoreSettings {
  announcement: string;
  phone: string;
  email: string;
  address: string;
  freeThreshold: number;
  codFee: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  ordersCount: number;
  totalSpent: number;
  role: string;
  lastOrderDate?: string;
}

export interface InventoryVariant {
  productId: string;
  productName: string;
  category: string;
  size: number;
  color: string;
  sku: string;
  inStock: boolean;
  stockCount: number;
}

