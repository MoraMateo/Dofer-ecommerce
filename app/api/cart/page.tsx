// app/cart/page.tsx
import CartPreview, { CartItem } from "@/components/CartPreview";

// Suponiendo que en un escenario real obtendrás estos datos del carrito de tu tienda
// Aquí te muestro dos ejemplos:

// Ejemplo para un producto único:
const singleProductCart: CartItem[] = [
  {
    id: 1,
    name: "Producto Único",
    image: "/images/product-unique.jpg",
    quantity: 1,
    price: 300
  }
];

// Ejemplo para un carrito con varios productos:
const multiProductCart: CartItem[] = [
  {
    id: 1,
    name: "Producto 1",
    image: "/images/product1.jpg",
    quantity: 2,
    price: 120
  },
  {
    id: 2,
    name: "Producto 2",
    image: "/images/product2.jpg",
    quantity: 1,
    price: 250
  }
];

export default function CartPage() {
  // Puedes cambiar entre singleProductCart y multiProductCart según tu prueba
  const cartItems: CartItem[] = multiProductCart; // o singleProductCart

  return (
    <div className="py-10">
      <CartPreview items={cartItems} />
    </div>
  );
}
