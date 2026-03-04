"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";

export default function CheckoutPage() {

  const router = useRouter();
  const { success, error, loading: toastLoading, dismiss } = useToast();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
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
            className="mt-6 inline-block rounded bg-[var(--accent)] px-6 py-3 text-white"
          >
            Browse Products
          </Link>

        </div>
      </main>
    );
  }

  const handlePlaceOrder = async () => {

    const trimmedName = name.trim();
    const trimmedAddress = address.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedAddress || !trimmedPhone) {
      error("Please fill all delivery fields");
      return;
    }

    if (!/^[0-9]{10}$/.test(trimmedPhone)) {
      error("Phone number must be 10 digits");
      return;
    }

    const toastId = toastLoading("Placing order...");

    setLoading(true);

    const orderData = {
      customerName: trimmedName,
      phone: trimmedPhone,
      address: trimmedAddress,
      items: items.map((item) => ({
        productId: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
      })),
      totalAmount: total,
    };

    try {

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
         credentials: "include",   // ensures cookies go with the request
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Order failed");
      }

      dismiss(toastId);
      success("Order placed successfully 🎉");

      clearCart();
      router.push("/orders");

    } catch (err) {

      dismiss(toastId);
      error(err.message || "Failed to place order");

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
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="Phone Number"
              maxLength={10}
              className="w-full rounded border px-3 py-2"
            />

          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="mt-8 w-full rounded bg-[var(--accent)] px-6 py-4 text-lg text-white"
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