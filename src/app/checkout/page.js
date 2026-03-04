"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="rounded-xl border bg-white p-8 text-center">
          <h1 className="text-2xl font-bold">
            Your cart is empty
          </h1>
          <p className="mt-2 text-gray-500">
            Add products before proceeding to checkout.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded bg-[var(--accent)] px-6 py-3 text-white hover:opacity-90"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  const handlePlaceOrder = async () => {
    if (!name || !address || !phone) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const orderData = {
      customerName: name,
      phone,
      address,
      items: items.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: total,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error();

      clearCart();
      router.push("/orders");
    } catch {
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="mt-2 text-gray-500">
          Review your order and enter delivery details.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        {/* ORDER SUMMARY */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">
            Order Summary
          </h2>

          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium">
                  ₹{item.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between border-t pt-4 text-lg font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* CUSTOMER INFO */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">
            Delivery Information
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full rounded border px-3 py-2"
            />

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Delivery Address"
              className="w-full rounded border px-3 py-2"
            />

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="w-full rounded border px-3 py-2"
            />
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="mt-8 w-full rounded bg-[var(--accent)] px-6 py-4 text-lg font-medium text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

          <p className="mt-4 text-center text-xs text-gray-500">
            Cash on delivery • Secure checkout
          </p>
        </div>
      </div>
    </main>
  );
}
