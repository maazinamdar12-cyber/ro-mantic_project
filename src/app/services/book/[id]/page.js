"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useServiceStore } from "@/store/serviceStore";

export default function BookServicePage() {
  const { id } = useParams();
  const router = useRouter();

  const { services, bookService } = useServiceStore();
  const service = services.find((s) => s.id === id);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  if (!service) {
    return <p className="p-6">Service not found</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    bookService({
      id: Date.now().toString(),
      serviceId: service.id,
      serviceName: service.name,
      customerName: name,
      address,
      phone,
      status: "Pending",
    });

    router.push("/services/confirmation");
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Book Service
        </h1>
        <p className="mt-2 text-gray-500">
          Fill in your details and our technician will contact you shortly.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Service Summary */}
        <div className="rounded-xl border bg-white p-6">
          <h2 className="text-xl font-semibold">
            {service.name}
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            {service.description}
          </p>

          <p className="mt-4 text-2xl font-extrabold">
            ₹{service.price}
          </p>

          <ul className="mt-4 space-y-1 text-sm text-gray-500">
            <li>✔ Verified technician</li>
            <li>✔ Genuine spare parts</li>
            <li>✔ Service warranty included</li>
          </ul>
        </div>

        {/* Booking Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border bg-white p-6 space-y-5"
        >
          <div>
            <label className="mb-1 block text-sm font-medium">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
              className="w-full rounded border px-3 py-2 focus:border-[var(--accent)] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Phone Number
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="9876543210"
              className="w-full rounded border px-3 py-2 focus:border-[var(--accent)] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Service Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="House no, street, area, city"
              rows={3}
              className="w-full rounded border px-3 py-2 focus:border-[var(--accent)] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-[var(--accent)] px-6 py-3 font-medium text-white hover:opacity-90"
          >
            Confirm Booking
          </button>

          <p className="text-xs text-gray-500 text-center">
            You’ll receive a confirmation call within 24 hours.
          </p>
        </form>
      </div>
    </main>
  );
}
