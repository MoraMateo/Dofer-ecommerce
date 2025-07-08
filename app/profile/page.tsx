// app/profile/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getOrders, getWooCustomer } from "@/services/wooCommerce";
import Link from "next/link";
import { renderAddress } from "@/utils/renderAddress";
import UpdateBillingSection from "@/components/UpdateBillingSection";

// Definimos el tipo para los pedidos
interface WCOrder {
  id: number;
  status: string;
  total: string;
  date_created: string;
}

export default async function ProfilePage() {
  // Obtenemos la sesión en el servidor
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

  // Obtenemos los pedidos y datos de WooCommerce
  const orders = (await getOrders()) as WCOrder[];
  let wooCustomer = null;
  if (user.email) {
    wooCustomer = await getWooCustomer(user.email);
  }

  const billing = wooCustomer?.billing;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">👤 Mi Perfil</h1>

      {/* Datos básicos del usuario */}
      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-xl font-semibold">{user.name || "Usuario"}</p>
        <p className="text-gray-600">{user.email}</p>
      </div>

      {/* Sección de dirección de facturación */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">📍 Dirección de Facturación</h2>
        </div>
        {renderAddress(billing, "No hay dirección de facturación registrada.")}
      </div>

      {/* Componente para actualizar la dirección de facturación */}
      <UpdateBillingSection
        wooToken={user.wooToken}
        initialBilling={billing}
        userEmail={user.email}
      />

      {/* Sección de pedidos */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">🛒 Mis Pedidos</h2>
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map(order => (
              <Link
                key={order.id}
                href={`/profile/orders/${order.id}`}
                className="block border rounded-xl p-4 flex justify-between items-center shadow-sm bg-white hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium">Pedido #{order.id}</p>
                  <p className="text-sm text-gray-500">Estado: {order.status}</p>
                  <p className="text-sm text-gray-500">Total: ${order.total}</p>
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(order.date_created).toLocaleDateString("es-MX")}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">Aún no tienes pedidos registrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}
