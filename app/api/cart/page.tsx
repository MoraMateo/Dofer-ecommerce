// app/cart/page.tsx
import CartPreview, { CartItem } from "@/components/CartPreview";

// Ejemplo de carrito con varios productos:
const cartItems: CartItem[] = [
  {
    id: 1,
    name: "Producto 1",
    image: "/images/product1.jpg",
    quantity: 2,
    price: 120,
  },
  {
    id: 2,
    name: "Producto 2",
    image: "/images/product2.jpg",
    quantity: 1,
    price: 250,
  },
];

export default function CartPage() {
  return (
    <div className="py-10">
      <CartPreview items={cartItems} />
    </div>
  );
}
