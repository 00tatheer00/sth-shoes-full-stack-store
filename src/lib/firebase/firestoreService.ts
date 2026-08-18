import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './config';
import { Product, Order } from '@/types';
import { dataEngine } from '../services/dataEngine';

export const firestoreService = {
  // ──────────────────────────────────────────────
  // PRODUCTS FIRESTORE
  // ──────────────────────────────────────────────
  async getProducts(): Promise<Product[]> {
    try {
      if (db && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        const colRef = collection(db, 'products');
        const snapshot = await getDocs(colRef);
        if (!snapshot.empty) {
          const list: Product[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() } as Product);
          });
          return list;
        }
      }
      return dataEngine.getProducts();
    } catch (e) {
      console.warn('Firestore products fetch fallback:', e);
      return dataEngine.getProducts();
    }
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      if (db && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        const colRef = collection(db, 'products');
        const q = query(colRef, where('slug', '==', slug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const docSnap = snapshot.docs[0];
          return { id: docSnap.id, ...docSnap.data() } as Product;
        }
      }
      return dataEngine.getProductBySlug(slug);
    } catch (e) {
      return dataEngine.getProductBySlug(slug);
    }
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      if (db && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        const colRef = collection(db, 'products');
        const docRef = await addDoc(colRef, product);
        const newProduct = { ...product, id: docRef.id };
        dataEngine.createProduct(product);
        return newProduct;
      }
      return dataEngine.createProduct(product);
    } catch (e) {
      return dataEngine.createProduct(product);
    }
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    try {
      if (db && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        const docRef = doc(db, 'products', id);
        await updateDoc(docRef, updates as any);
      }
      return dataEngine.updateProduct(id, updates);
    } catch (e) {
      return dataEngine.updateProduct(id, updates);
    }
  },

  async deleteProduct(id: string): Promise<boolean> {
    try {
      if (db && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        const docRef = doc(db, 'products', id);
        await deleteDoc(docRef);
      }
      return dataEngine.deleteProduct(id);
    } catch (e) {
      return dataEngine.deleteProduct(id);
    }
  },

  // ──────────────────────────────────────────────
  // ORDERS FIRESTORE
  // ──────────────────────────────────────────────
  async getOrders(): Promise<Order[]> {
    try {
      if (db && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        const colRef = collection(db, 'orders');
        const q = query(colRef, orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const list: Order[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() } as Order);
          });
          return list;
        }
      }
      return dataEngine.getOrders();
    } catch (e) {
      return dataEngine.getOrders();
    }
  },

  async createOrder(order: Omit<Order, 'id'>): Promise<Order> {
    try {
      if (db && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        const colRef = collection(db, 'orders');
        const docRef = await addDoc(colRef, order);
        const newOrder = { ...order, id: docRef.id };
        dataEngine.createOrder(order);
        return newOrder;
      }
      return dataEngine.createOrder(order);
    } catch (e) {
      return dataEngine.createOrder(order);
    }
  },

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
    try {
      if (db && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        const docRef = doc(db, 'orders', orderId);
        await updateDoc(docRef, { status });
      }
      return dataEngine.updateOrderStatus(orderId, status);
    } catch (e) {
      return dataEngine.updateOrderStatus(orderId, status);
    }
  },
};
