"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useServiceStore } from "@/store/serviceStore";

export default function AdminDashboard() {
  const { bookings, technicians } = useServiceStore();

  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProductCount(data.length));
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-gray-500">
          Overview of products, orders, and service operations.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Products"
          value={productCount}
          link="/admin/products"
          label="Manage products"
        />

        <DashboardCard
          title="Service Bookings"
          value={bookings.length}
          link="/admin/services"
          label="View bookings"
        />

        <DashboardCard
          title="Technicians"
          value={technicians.length}
          link="/admin/technicians"
          label="Manage technicians"
        />

        <DashboardStatus />
      </div>
    </div>
  );
}

/* ================= DASHBOARD CARD ================= */

function DashboardCard({ title, value, link, label }) {
  return (
    <Link
      href={link}
      className="rounded-xl border  p-6 shadow-sm transition hover:shadow-md"
    >
      <h2 className="text-sm font-medium text-gray-500">
        {title}
      </h2>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>

      <p className="mt-2 text-sm text-[var(--accent)]">
        {label} →
      </p>
    </Link>
  );
}

/* ================= SYSTEM STATUS ================= */

function DashboardStatus() {
  return (
    <div className="rounded-xl border  p-6 shadow-sm">
      <h2 className="text-sm font-medium text-gray-500">
        System Status
      </h2>

      <p className="mt-3 text-xl font-semibold text-green-600">
        ● All systems operational
      </p>

      <p className="mt-2 text-sm text-gray-500">
        No incidents reported
      </p>
    </div>
  );
}
