"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((s, i) => s + i.quantity, 0);

  const linkClass = (href) =>
    pathname === href
      ? "text-[var(--accent)] font-medium"
      : "hover:text-[var(--accent)]";

  return (
    <nav className="border-b bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 h-16">
        <Link href="/" className="text-2xl font-black">
          RO<span className="text-[var(--accent)]">-mantic</span>
        </Link>

        <ul className="flex items-center gap-6 text-sm">
          <Link href="/products" className={linkClass("/products")}>
            Products
          </Link>

          <Link href="/services" className={linkClass("/services")}>
            Services
          </Link>

          {user && (
            <Link href="/orders" className={linkClass("/orders")}>
              Orders
            </Link>
          )}

          {user && (
            <Link href="/services/my-bookings" className={linkClass("/bookings")}>
              My Bookings
            </Link>
          )}
          {user?.role === "admin" && (
            <Link href="/admin" className={linkClass("/admin")}>
              Admin
            </Link>
          )}

          <Link href="/cart" className="relative">
            Cart
            {cartCount > 0 && (
              <span className="ml-1 rounded-full bg-[var(--accent)] px-2 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {!loading &&
            (user ? (
              <button
                onClick={async () => {
                  await logout();
                  router.push("/login");
                }}
                className="text-red-600"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className={linkClass("/login")}>
                Login
              </Link>
            ))}
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
}
