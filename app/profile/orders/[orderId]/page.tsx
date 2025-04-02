// app/profile/orders/[orderId]/page.tsx
import OrderTracking from "@/components/OrderTracking";
import Link from "next/link";

interface OrderDetailPageProps {
  params: { orderId: string };
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = params;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link href="/profile" className="text-blue-600 hover:underline mb-4 block">
        ← Volver a Mi Perfil
      </Link>
      <OrderTracking orderId={orderId} />
    </div>
  );
}
