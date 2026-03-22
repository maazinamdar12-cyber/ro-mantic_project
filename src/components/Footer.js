import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Top */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-black tracking-tight">
              RO<span className="text-[var(--accent)]">-mantic</span>
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              RO purifier sales, installation, AMC, and repair services —
              managed end to end.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Products
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-[var(--accent)]">
                  RO Purifiers
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[var(--accent)]">
                  Installation & AMC
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Customer
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/orders" className="hover:text-[var(--accent)]">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[var(--accent)]">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[var(--accent)]">
                  Book Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-[var(--accent)]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--accent)]">
                  About
                </Link>
              </li>
              <li>
                <span className="text-gray-500">
                  Service Hours: 9am – 7pm
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-sm text-gray-500 md:flex-row">
          <span>
            © {new Date().getFullYear()} RO-mantic. All rights reserved.
          </span>
          <span>
            Built for reliable water & reliable service.
          </span>
        </div>
      </div>
    </footer>
  );
}
