"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { productSchema } from "@/lib/validation/productSchema";
import { useToast } from "@/hooks/useToast";

export default function AdminProductsPage() {

  const { success, error, loading, dismiss } = useToast();

  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  // Load products
  const loadProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      error("Failed to load products");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Add product
  const onSubmit = async (data) => {

    const toastId = loading("Adding product...");

    try {

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dismiss(toastId);
      success("Product added");

      reset();
      loadProducts();

    } catch (err) {
      dismiss(toastId);
      error(err.message);
    }
  };

  // Update product
  const handleUpdate = async (id) => {

    const toastId = loading("Updating product...");

    try {

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName,
          price: Number(editPrice),
          description: editDescription,
          image: editImageUrl,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dismiss(toastId);
      success("Product updated");

      setEditingId(null);
      loadProducts();

    } catch (err) {
      dismiss(toastId);
      error(err.message);
    }
  };

  // Delete product
  const handleDelete = async (id) => {

    const toastId = loading("Deleting product...");

    try {

      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dismiss(toastId);
      success("Product deleted");

      loadProducts();

    } catch (err) {
      dismiss(toastId);
      error(err.message);
    }
  };

  return (
    <div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="mt-2 text-gray-500">
          Add, edit, and manage your product catalog.
        </p>
      </div>

      {/* ================= ADD PRODUCT ================= */}

      <div className="mb-10 rounded-xl border  p-6 shadow-sm">

        <h2 className="mb-4 text-lg font-semibold">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="grid gap-4 md:grid-cols-3">

            <div>
              <input
                {...register("name")}
                placeholder="Product name"
                className="rounded border px-3 py-2 w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                placeholder="Price"
                className="rounded border px-3 py-2 w-full"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("description")}
                placeholder="Description"
                className="rounded border px-3 py-2 w-full"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("image")}
                placeholder="Image URL"
                className="rounded border px-3 py-2 w-full"
              />
              {errors.image && (
                <p className="text-red-500 text-sm">
                  {errors.image.message}
                </p>
              )}
            </div>

          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 rounded bg-[var(--accent)] px-6 py-3 text-white"
          >
            {isSubmitting ? "Adding..." : "Add Product"}
          </button>

        </form>
      </div>

      {/* ================= PRODUCT LIST ================= */}

      <div className="rounded-xl border  shadow-sm overflow-hidden">

        {products.length === 0 ? (

          <div className="p-8 text-center text-gray-500">
            No products added yet.
          </div>

        ) : (

          <table className="w-full text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>

              {products.map((p) => (

                <tr key={p._id} className="border-t hover:bg-gray-50">

                  <td className="px-4 py-3">
                    {editingId === p._id ? (
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full rounded border px-2 py-1"
                      />
                    ) : (
                      p.name
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {editingId === p._id ? (
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className="w-full rounded border px-2 py-1"
                      />
                    ) : (
                      `₹${p.price}`
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {editingId === p._id ? (
                      <input
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full rounded border px-2 py-1"
                      />
                    ) : (
                      p.description
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {editingId === p._id ? (
                      <input
                        value={editImageUrl}
                        onChange={(e) => setEditImageUrl(e.target.value)}
                        className="w-full rounded border px-2 py-1"
                      />
                    ) : (
                      p.image
                    )}
                  </td>

                  <td className="px-4 py-3 text-right space-x-3">

                    {editingId === p._id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(p._id)}
                          className="text-green-600"
                        >
                          Save
                        </button>

                        <button
                          onClick={() => setEditingId(null)}
                          className="text-gray-500"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(p._id);
                            setEditName(p.name);
                            setEditPrice(p.price);
                            setEditDescription(p.description);
                            setEditImageUrl(p.image);
                          }}
                          className="text-[var(--accent)]"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(p._id)}
                          className="text-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}

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