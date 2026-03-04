"use client";

import Link from "next/link";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 border-r bg-white px-4 py-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-lg font-bold">Admin Panel</h2>
          <AdminLogoutButton />
        </div>

        <nav className="space-y-1 text-sm">
          <NavItem href="/admin" label="Dashboard" />
          <NavItem href="/admin/products" label="Products" />
          <NavItem href="/admin/orders" label="Orders" />
          <NavItem href="/admin/services" label="Services" />
          <NavItem href="/admin/technicians" label="Technicians" />
        </nav>
      </aside>

      {/* ================= CONTENT ================= */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

function NavItem({ href, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block rounded px-3 py-2 font-medium transition ${
        isActive
          ? "bg-[var(--accent)] text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );
}
