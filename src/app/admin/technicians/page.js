"use client";

import { useEffect, useState } from "react";

export default function AdminTechniciansPage() {
  const [technicians, setTechnicians] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  /* ================= FETCH TECHNICIANS ================= */
  useEffect(() => {
    fetch("/api/technicians")
      .then((res) => res.json())
      .then((data) => setTechnicians(data));
  }, []);

  /* ================= ADD TECHNICIAN ================= */
  const handleAdd = async () => {
    if (!name || !phone) return;

    const res = await fetch("/api/technicians", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone }),
    });

    if (res.ok) {
      const newTech = await res.json();
      setTechnicians((prev) => [newTech, ...prev]);
      setName("");
      setPhone("");
    } else {
      alert("Failed to add technician");
    }
  };

  /* ================= DELETE TECHNICIAN ================= */
  const handleDelete = async (id) => {
    await fetch(`/api/technicians/${id}`, {
      method: "DELETE",
    });

    setTechnicians((prev) =>
      prev.filter((t) => t._id !== id)
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Technicians
        </h1>
        <p className="mt-2 text-gray-500">
          Manage service technicians and contact details.
        </p>
      </div>

      {/* ================= ADD TECHNICIAN ================= */}
      <div className="mb-10 rounded-xl border  p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Add Technician
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Technician name"
            className="rounded border px-3 py-2"
          />

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="rounded border px-3 py-2"
          />

          <button
            onClick={handleAdd}
            className="rounded bg-[var(--accent)] px-6 py-2 font-medium text-white"
          >
            Add Technician
          </button>
        </div>
      </div>

      {/* ================= TECHNICIAN LIST ================= */}
      <div className="rounded-xl border  shadow-sm overflow-hidden">
        {technicians.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No technicians added yet.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">
                  Name
                </th>
                <th className="px-4 py-3 text-left">
                  Phone
                </th>
                <th className="px-4 py-3 text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {technicians.map((t) => (
                <tr
                  key={t._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">
                    {t.name}
                  </td>
                  <td className="px-4 py-3">
                    {t.phone}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() =>
                        handleDelete(t._id)
                      }
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
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
