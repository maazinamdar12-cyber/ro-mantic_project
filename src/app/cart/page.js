"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ================= EMPTY CART ================= */
  if (items.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="rounded-xl border bg-white p-8 text-center">
          <h1 className="text-2xl font-bold">
            Your cart is empty
          </h1>
          <p className="mt-2 text-gray-500">
            Looks like you haven’t added anything yet.
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

  /* ================= CART ================= */
  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <p className="mt-2 text-gray-500">
          Review your items before proceeding to checkout.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        {/* ================= ITEMS ================= */}
        <div className="md:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Product Info */}
              <div>
                <h2 className="text-lg font-semibold">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-500">
                  ₹{item.price} per unit
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="h-9 w-9 rounded border text-lg hover:bg-gray-100"
                >
                  −
                </button>

                <span className="w-6 text-center font-medium">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="h-9 w-9 rounded border text-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-lg font-bold">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="rounded-xl border bg-white p-6 shadow-sm h-fit">
          <h2 className="mb-4 text-xl font-semibold">
            Order Summary
          </h2>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Items</span>
            <span>{items.length}</span>
          </div>

          <div className="mt-2 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <Link
            href="/checkout"
            className="mt-6 block w-full rounded bg-[var(--accent)] px-6 py-4 text-center font-medium text-white hover:opacity-90"
          >
            Proceed to Checkout
          </Link>

          <p className="mt-4 text-center text-xs text-gray-500">
            Secure checkout • No hidden charges
          </p>
        </div>
      </div>
    </main>
  );
}
