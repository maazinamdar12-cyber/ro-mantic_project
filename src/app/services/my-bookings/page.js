"use client";

import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/services", {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch bookings");
        }

        setBookings(data.bookings || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-14">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Service Requests</h1>
        <p className="mt-2 text-gray-500">
          Track the status of your RO service bookings.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-500">
          Loading bookings...
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl border bg-red-50 p-6 text-center text-red-600">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && bookings.length === 0 && (
        <div className="rounded-xl border  p-8 text-center">
          <p className="text-gray-600">
            You haven’t booked any services yet.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Book a service to get installation, repair, or AMC support.
          </p>
        </div>
      )}

      {/* List */}
      {!loading && !error && bookings.length > 0 && (
        <div className="space-y-6">
          {bookings.map((b) => (
            <BookingCard key={b._id} booking={b} />
          ))}
        </div>
      )}
    </main>
  );
}

/* ================= BOOKING CARD ================= */

function BookingCard({ booking }) {
  return (
    <div className="rounded-xl border  p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">
          {booking.serviceName}
        </h2>

        <StatusBadge status={booking.status} />
      </div>

      <div className="mt-4 space-y-1 text-sm text-gray-600">
        <div>
          <span className="font-medium">Customer:</span>{" "}
          {booking.customerName}
        </div>
        <div>
          <span className="font-medium">Phone:</span>{" "}
          {booking.phone}
        </div>
        <div>
          <span className="font-medium">Address:</span>{" "}
          {booking.address}
        </div>

        {booking.technicianName && (
          <div>
            <span className="font-medium">Technician:</span>{" "}
            {booking.technicianName}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= STATUS BADGE ================= */

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Assigned: "bg-blue-100 text-blue-700",
    "In Progress": "bg-purple-100 text-purple-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};