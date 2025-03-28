import { create } from "zustand";

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
  // Función para agregar un producto. Si ya existe, suma la cantidad.
  addItem: (item: CartItem) => void;
  // Función para eliminar un producto por su id
  removeItem: (id: number) => void;
  // Función para actualizar la cantidad de un producto
  updateQuantity: (id: number, quantity: number) => void;
  // Función para limpiar el carrito
  clearCart: () => void;
  // Función que retorna el total acumulado
  total: () => number;
}

// Crea el store usando Zustand
export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item: CartItem) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        // Si el producto ya existe, incrementa la cantidad
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      } else {
        // Si no existe, agrégalo al carrito
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
}));
