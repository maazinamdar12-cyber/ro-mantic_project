"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";

export default function AdminOrdersPage() {

  const [orders, setOrders] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  const { success, error, loading, dismiss } = useToast();

  const loadOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch {
      error("Failed to load orders");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {

    const toastId = loading("Updating status...");

    setUpdatingId(id);

    try {

      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dismiss(toastId);
      success("Order status updated");

      loadOrders();

    } catch (err) {

      dismiss(toastId);
      error(err.message || "Failed to update order");

    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>

        <p className="mt-2 text-gray-500">
          View and manage customer orders.
        </p>
      </div>


      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">

        {orders.length === 0 ? (

          <div className="p-8 text-center text-gray-500">
            No orders yet.
          </div>

        ) : (

          <table className="w-full text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Items</th>
              </tr>
            </thead>

            <tbody>

              {orders.map((order) => (

                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-4 py-3 font-medium">
                    #{order._id.slice(-6)}
                  </td>

                  <td className="px-4 py-3">
                    {order.customerName}
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    ₹{order.totalAmount}
                  </td>

                  <td className="px-4 py-3">

                    <select
                      value={order.status}
                      disabled={updatingId === order._id}
                      onChange={(e) =>
                        handleStatusUpdate(order._id, e.target.value)
                      }
                      className="rounded border px-2 py-1 text-sm"
                    >

                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>

                    </select>

                  </td>

                  <td className="px-4 py-3 text-right text-sm text-gray-500">
                    {order.items.length} item(s)
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}