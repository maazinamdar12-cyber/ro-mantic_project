"use client";

import { useToast } from "@/hooks/useToast";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function ProductDetailPage() {

  const { success, error } = useToast();

  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        error("Failed to load product");
        setProduct(null);
        setLoading(false);
      });

  }, [id]);

  const handleAddToCart = () => {

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });

    success("Added to cart");
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-gray-500">Loading product…</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>

        <Link
          href="/products"
          className="mt-4 inline-block text-[var(--accent)]"
        >
          ← Back to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-14">

      {/* Back */}
      <Link
        href="/products"
        className="text-sm text-gray-500 hover:text-[var(--accent)]"
      >
        ← Back to Products
      </Link>

      <div className="mt-10 grid gap-10 md:grid-cols-2 items-start">

        {/* Image */}
        <div className="rounded-xl border  p-6">
          <img
            src={product.image || "/images/placeholder-product.jpg"}
            alt={product.name}
            className="w-full h-80 object-contain"
          />
        </div>

        {/* Info */}
        <div>

          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <p className="mt-6 text-3xl font-extrabold">
            ₹{product.price}
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-8 w-full md:w-auto rounded bg-[var(--accent)] px-8 py-4 text-white font-medium hover:opacity-90"
          >
            Add to Cart
          </button>

          <ul className="mt-6 space-y-2 text-sm text-gray-500">
            <li>✔ Free installation included</li>
            <li>✔ 1 year warranty</li>
            <li>✔ Service support available</li>
          </ul>

        </div>
      </div>

    </main>
  );
}