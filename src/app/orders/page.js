"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders",{
        credentials: "include",
      });
        const data = await res.json();
        setOrders(data || []);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-14">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="mt-2 text-gray-500">
          Track your product orders and delivery status.
        </p>
      </div>

      {loading && <p className="text-gray-500">Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <p className="text-gray-500">No orders found.</p>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            orderId={order._id}
            status={order.status}
            delivery={order.delivery}
          />
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/products"
          className="rounded border px-6 py-3 text-center font-medium hover:bg-gray-100"
        >
          Continue Shopping
        </Link>

        <Link
          href="/services"
          className="rounded bg-[var(--accent)] px-6 py-3 text-center font-medium text-white hover:opacity-90"
        >
          Book a Service
        </Link>
      </div>
    </main>
  );
}

function OrderCard({ orderId, status, delivery }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">Order #{orderId}</h2>
        <StatusBadge status={status} />
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <span className="font-medium">Delivery:</span> {delivery}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}