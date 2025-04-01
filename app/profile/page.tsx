// app/profile/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getOrders } from "@/services/wooCommerce";
import Image from "next/image";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">No has iniciado sesión</h2>
        <Link href="/auth/signin" className="text-blue-600 hover:underline">
          Ir a iniciar sesión
        </Link>
      </div>
    );
  }

  const orders = await getOrders();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">👤 Mi Perfil</h1>

      <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center justify-center">
          <Image
            src={user.image || "/default-avatar.png"}
            alt="Avatar"
            width={120}
            height={120}
            className="rounded-full border shadow"
          />
        </div>
        <div className="md:col-span-2">
          <p className="text-xl font-semibold">{user.name || "Usuario"}</p>
          <p className="text-gray-600">{user.email}</p>
          <p className="mt-2 text-sm text-gray-500">Miembro desde 2024</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">🛒 Mis Pedidos</h2>
        <div className="space-y-4">
          {orders?.length > 0 ? (
            orders.map((order: any) => (
              <div
                key={order.id}
                className="border rounded-xl p-4 flex justify-between items-center shadow-sm bg-white"
              >
                <div>
                  <p className="font-medium">Pedido #{order.id}</p>
                  <p className="text-sm text-gray-500">Estado: {order.status}</p>
                  <p className="text-sm text-gray-500">Total: ${order.total}</p>
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(order.date_created).toLocaleDateString("es-MX")}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Aún no tienes pedidos registrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}
