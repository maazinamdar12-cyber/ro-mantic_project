"use client";

import { useParams } from "next/navigation";
import { useServiceStore } from "@/store/serviceStore";

export default function TechnicianDashboard() {
  const { id } = useParams();

  const {
    bookings,
    technicians,
    updateBookingStatus,
  } = useServiceStore();

  const technician = technicians.find((t) => t.id === id);
  const jobs = bookings.filter((b) => b.technicianId === id);

  if (!technician) {
    return (
      <p className="p-6 text-center text-gray-600">
        Technician not found
      </p>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-14">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {technician.name}
        </h1>
        <p className="mt-1 text-gray-500">
          Assigned Service Jobs
        </p>
      </div>

      {/* Empty State */}
      {jobs.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center">
          <p className="text-gray-600">
            No jobs assigned yet.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Please check back later.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onStatusChange={updateBookingStatus}
            />
          ))}
        </div>
      )}
    </main>
  );
}

/* ================= JOB CARD ================= */

function JobCard({ job, onStatusChange }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      {/* Top */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">
          {job.serviceName}
        </h2>
        <StatusBadge status={job.status} />
      </div>

      {/* Details */}
      <div className="mt-4 space-y-1 text-sm text-gray-600">
        <div>
          <span className="font-medium">Customer:</span>{" "}
          {job.customerName}
        </div>
        <div>
          <span className="font-medium">Phone:</span>{" "}
          {job.phone}
        </div>
        <div>
          <span className="font-medium">Address:</span>{" "}
          {job.address}
        </div>
      </div>

      {/* Action */}
      <div className="mt-5 flex items-center gap-3">
        <label className="text-sm font-medium">
          Update Status:
        </label>
        <select
          value={job.status}
          onChange={(e) =>
            onStatusChange(job.id, e.target.value)
          }
          className="rounded border px-3 py-2 focus:border-[var(--accent)] focus:outline-none"
        >
          <option>Assigned</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
    </div>
  );
}

/* ================= STATUS BADGE ================= */

function StatusBadge({ status }) {
  const styles = {
    Assigned: "bg-blue-100 text-blue-700",
    "In Progress": "bg-purple-100 text-purple-700",
    Completed: "bg-green-100 text-green-700",
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
}
