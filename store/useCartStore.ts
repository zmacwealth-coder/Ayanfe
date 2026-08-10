import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  slug: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  categorySlug: string;
}

interface CartStore {
  items: CartItem[];
  wishlist: WishlistItem[];
  isCartOpen: boolean;

  // Cart actions
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;

  // Wishlist actions
  addToWishlist: (item: Omit<WishlistItem, 'id'>) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isInCart: (productId: string) => boolean;

  // Computed
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      isCartOpen: false,

      addToCart: (newItem) => {
        const existing = get().items.find((i) => i.productId === newItem.productId);
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.productId === newItem.productId
                ? { ...i, quantity: i.quantity + newItem.quantity }
                : i
            ),
          }));
          toast.success('Cart updated!');
        } else {
          set((state) => ({
            items: [
              ...state.items,
              { ...newItem, id: `cart-${Date.now()}-${newItem.productId}` },
            ],
            isCartOpen: true,
          }));
          toast.success(`${newItem.name} added to cart`);
        }
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
        toast.success('Removed from cart');
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      setCartOpen: (open) => set({ isCartOpen: open }),

      addToWishlist: (item) => {
        const existing = get().wishlist.find((i) => i.productId === item.productId);
        if (existing) {
          toast.error('Already in your wishlist');
          return;
        }
        set((state) => ({
          wishlist: [
            ...state.wishlist,
            { ...item, id: `wish-${Date.now()}-${item.productId}` },
          ],
        }));
        toast.success(`${item.name} added to wishlist`);
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((i) => i.productId !== productId),
        }));
        toast.success('Removed from wishlist');
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((i) => i.productId === productId);
      },

      isInCart: (productId) => {
        return get().items.some((i) => i.productId === productId);
      },

      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'ayanfe-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
