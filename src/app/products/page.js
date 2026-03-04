"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-14">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">RO Purifiers</h1>
        <p className="mt-2 text-gray-500">
          High-quality RO systems with installation & service support.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
}

/* ================= PRODUCT CARD ================= */

function ProductCard({ product }) {
  return (
    <div className="group rounded-xl border bg-white overflow-hidden transition hover:shadow-lg">
      {/* Image */}
      <div className="h-48 bg-gray-100 overflow-hidden">
        <img
          src={product.image || "/images/placeholder-product.jpg"}
          alt={product.name}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col h-full">
        <h2 className="text-lg font-semibold">
          {product.name}
        </h2>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">
            ₹{product.price}
          </span>

          <Link
            href={`/products/${product._id}`}
            className="rounded bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
