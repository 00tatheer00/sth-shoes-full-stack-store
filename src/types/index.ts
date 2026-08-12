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
  title: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

export interface OrderItem {
  productName: string;
  color: string;
  size: number;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled';
  timeline: { title: string; date: string; completed: boolean }[];
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  shippingAddress: Address;
  trackingNumber: string;
}
