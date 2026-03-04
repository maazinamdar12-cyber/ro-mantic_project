import Link from "next/link";

export default function ServiceConfirmationPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 text-center shadow-sm">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
          ✓
        </div>

        <h1 className="text-2xl font-bold">
          Service Booked Successfully
        </h1>

        <p className="mt-3 text-gray-600">
          Thank you for booking with RO-mantic.
          Our technician will contact you shortly to confirm the visit.
        </p>

        {/* Next actions */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/services"
            className="rounded bg-[var(--accent)] px-6 py-3 font-medium text-white hover:opacity-90"
          >
            Book Another Service
          </Link>

          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-[var(--accent)]"
          >
            Back to Home
          </Link>
        </div>

        {/* Reassurance */}
        <p className="mt-6 text-xs text-gray-500">
          Need help? Contact our support team anytime.
        </p>
      </div>
    </main>
  );
}
