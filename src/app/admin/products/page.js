"use client";

import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");


  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImageUrl, setEditImageUrl] = useState(null);

  // Fetch products from DB
  const loadProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Add product
  const handleAddProduct = async () => {
    if (!name || !price) return;

    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price: Number(price),
        description,
        image:imageUrl
      }),
    });

    setName("");
    setPrice("");
    setDescription("");

    loadProducts();
  };

  // Update product
  const handleUpdate = async (id) => {
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editName,
        price: Number(editPrice),
        description: editDescription,
        image : imageUrl
      }),
    });

    setEditingId(null);
    loadProducts();
  };

  // Delete product
  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    loadProducts();
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
      <div className="mb-10 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Add New Product
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
            className="rounded border px-3 py-2"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="number"
            className="rounded border px-3 py-2"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description"
            className="rounded border px-3 py-2"
          />
            <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Add image url"
            className="rounded border px-3 py-2"
          />
        </div>

        <button
          onClick={handleAddProduct}
          className="mt-5 rounded bg-[var(--accent)] px-6 py-3 text-white"
        >
          Add Product
        </button>
      </div>

      {/* ================= PRODUCT LIST ================= */}
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
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
                <th className="px-4 py-3 text-left">Image Urls</th>

                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr
                  key={p._id}
                  className="border-t hover:bg-gray-50"
                >
                  {/* Name */}
                  <td className="px-4 py-3">
                    {editingId === p._id ? (
                      <input
                        value={editName}
                        onChange={(e) =>
                          setEditName(e.target.value)
                        }
                        className="w-full rounded border px-2 py-1"
                      />
                    ) : (
                      p.name
                    )}
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3">
                    {editingId === p._id ? (
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) =>
                          setEditPrice(e.target.value)
                        }
                        className="w-full rounded border px-2 py-1"
                      />
                    ) : (
                      `₹${p.price}`
                    )}
                  </td>

                  {/* Description */}
                  <td className="px-4 py-3">
                    {editingId === p._id ? (
                      <input
                        value={editDescription}
                        onChange={(e) =>
                          setEditDescription(e.target.value)
                        }
                        className="w-full rounded border px-2 py-1"
                      />
                    ) : (
                      p.description
                    )}
                  </td>
                    {/* Image Url */}
                  <td className="px-4 py-3">
                    {editingId === p._id ? (
                      <input
                        value={editImageUrl}
                        onChange={(e) =>
                          setEditImageUrl(e.target.value)
                        }
                        className="w-full rounded border px-2 py-1"
                      />
                    ) : (
                      p.image
                    )}
                  </td>
                  {/* Actions */}
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
