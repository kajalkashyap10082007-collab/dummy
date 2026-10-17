import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './types';

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  user: any | null;
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, size: string | undefined, color: string | undefined, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  login: (user: any) => void;
  logout: () => void;
  hydrate: () => void;
  isHydrated: boolean;
}

// Detect if we're in a browser environment
const isBrowser = typeof window !== 'undefined';
// Flag to track if hydration has been queued
let hydrationScheduled = false;

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      user: null,
      isHydrated: false,

      addToCart: (product, size, color, quantity = 1) => set((state) => {
        const existingItem = state.cart.find(
          (item) => item.product.id === product.id && item.size === size && item.color === color
        );
        if (existingItem) {
          return {
            cart: state.cart.map((item) =>
              item === existingItem
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          };
        }
        return { cart: [...state.cart, { product, size, color, quantity }] };
      }),

      removeFromCart: (productId, size, color) => set((state) => ({
        cart: state.cart.filter(
          (item) => !(item.product.id === productId && item.size === size && item.color === color)
        ),
      })),

      updateQuantity: (productId, size, color, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
          item.product.id === productId && item.size === size && item.color === color
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        ),
      })),

      clearCart: () => set({ cart: [] }),

      addToWishlist: (product) => set((state) => ({
        wishlist: state.wishlist.some(p => p.id === product.id) 
          ? state.wishlist 
          : [...state.wishlist, product],
      })),

      removeFromWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.filter((p) => p.id !== productId),
      })),

      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      
      hydrate: () => {
        if (!isBrowser || get().isHydrated) return;
        
        // Only hydrate once
        set({ isHydrated: true });
        
        // Try to read persisted state from localStorage
        try {
          const stored = localStorage.getItem('clothify-storage');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.state) {
              set(parsed.state);
            }
          }
        } catch (error) {
          console.error('Failed to hydrate store:', error);
        }
      }
    }),
    {
      name: 'clothify-storage',
      // Prevent automatic hydration from localStorage on store creation
      skipHydration: true,
    }
  )
);

// Schedule hydration to happen after initial render completes
// Use requestIdleCallback if available, otherwise setTimeout
if (isBrowser && !hydrationScheduled) {
  hydrationScheduled = true;
  if (typeof requestIdleCallback !== 'undefined') {
    // Wait for main thread to be idle (after React rendering)
    requestIdleCallback(() => {
      useStore.getState().hydrate();
    }, { timeout: 2000 });
  } else {
    // Fallback: schedule after React has finished rendering
    // Using setTimeout(0) defers to after microtasks, then another setTimeout for after rendering
    setTimeout(() => {
      setTimeout(() => {
        useStore.getState().hydrate();
      }, 0);
    }, 0);
  }
}
