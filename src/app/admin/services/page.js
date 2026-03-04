"use client";

import { useEffect, useState } from "react";

export default function AdminServicesPage() {
  const [bookings, setBookings] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [filter, setFilter] = useState("All");

  /* ================= FETCH BOOKINGS ================= */
  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  /* ================= FETCH TECHNICIANS ================= */
  useEffect(() => {
    fetch("/api/technicians")
      .then((res) => res.json())
      .then((data) => setTechnicians(data));
  }, []);

  const filteredBookings =
    filter === "All"
      ? bookings
      : bookings.filter((b) => b.status === filter);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    await fetch(`/api/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setBookings((prev) =>
      prev.map((b) =>
        b._id === id ? { ...b, status } : b
      )
    );
  };

  /* ================= ASSIGN TECHNICIAN ================= */
  const assignTechnician = async (bookingId, techId) => {
    const technician = technicians.find(
      (t) => t._id === techId
    );

    await fetch(`/api/services/${bookingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        technicianId: techId,
        technicianName: technician.name,
        status: "Assigned",
      }),
    });

    setBookings((prev) =>
      prev.map((b) =>
        b._id === bookingId
          ? {
              ...b,
              technicianId: techId,
              technicianName: technician.name,
              status: "Assigned",
            }
          : b
      )
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Service Bookings
          </h1>
          <p className="mt-1 text-gray-500">
            Assign technicians and manage service status.
          </p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded border bg-white px-4 py-2 text-sm"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Assigned</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-white overflow-hidden">
        {filteredBookings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No bookings found.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Technician</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((b) => (
                <tr
                  key={b._id}
                  className="border-t"
                >
                  <td className="px-4 py-3 font-medium">
                    {b.serviceName}
                  </td>

                  <td className="px-4 py-3">
                    {b.customerName}
                  </td>

                  <td className="px-4 py-3">
                    {b.phone}
                  </td>

                  <td className="px-4 py-3">
                    {b.technicianName ? (
                      b.technicianName
                    ) : (
                      <select
                        onChange={(e) =>
                          assignTechnician(
                            b._id,
                            e.target.value
                          )
                        }
                        className="rounded border px-2 py-1"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Assign
                        </option>
                        {technicians.map((t) => (
                          <option
                            key={t._id}
                            value={t._id}
                          >
                            {t.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={b.status}
                      onChange={(e) =>
                        updateStatus(
                          b._id,
                          e.target.value
                        )
                      }
                      className="rounded border px-2 py-1"
                    >
                      <option>Pending</option>
                      <option>Assigned</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
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
