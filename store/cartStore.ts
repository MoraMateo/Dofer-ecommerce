// store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define la interfaz para un ítem del carrito
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// Define la interfaz del estado del carrito
interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item: CartItem) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          } else {
            return { items: [...state.items, item] };
          }
        }),
      removeItem: (id: number) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id: number, quantity: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      total: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage", // Nombre de la key en localStorage
      getStorage: () => localStorage, // Usa localStorage para persistir
    }
  )
);
