"use client";

import Link from "next/link";

/* ================= SERVICE CATALOG ================= */
/* Static business-defined services */
const services = [
  {
    id: "install",
    name: "RO Installation",
    price: 999,
    description: "New RO installation at your home",
  },
  {
    id: "amc",
    name: "Annual Maintenance (AMC)",
    price: 1999,
    description: "1 year complete RO maintenance",
  },
  {
    id: "repair",
    name: "RO Repair",
    price: 499,
    description: "Fix RO issues and replace minor parts",
  },
];

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">RO Services</h1>
        <p className="mt-2 text-gray-500">
          Professional installation, maintenance, and repair services
          for your RO system.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </main>
  );
}

/* ================= SERVICE CARD ================= */

function ServiceCard({ service }) {
  return (
    <div className="group rounded-xl border p-6 transition hover:shadow-lg">
      {/* Title */}
      <h2 className="text-xl font-semibold">
        {service.name}
      </h2>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-600 leading-relaxed">
        {service.description}
      </p>

      {/* Price */}
      <p className="mt-5 text-2xl font-extrabold">
        ₹{service.price}
      </p>

      {/* Trust points */}
      <ul className="mt-4 space-y-1 text-sm text-gray-500">
        <li>✔ Verified technician</li>
        <li>✔ Genuine spare parts</li>
        <li>✔ Service warranty</li>
      </ul>

      {/* CTA */}
      <Link
        href={`/services/book/${service.id}`}
        className="mt-6 inline-block w-full rounded bg-[var(--accent)] px-6 py-3 text-center font-medium text-white transition hover:opacity-90"
      >
        Book Service
      </Link>
    </div>
  );
}
