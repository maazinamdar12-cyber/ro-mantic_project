"use client";

import { useRouter } from "next/navigation";
import { useServiceStore } from "@/store/serviceStore";

export default function TechnicianSelectPage() {
  const technicians = useServiceStore((s) => s.technicians);
  const router = useRouter();

  const handleSelect = (id) => {
    router.push(`/technician/${id}`);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Technician Dashboard
        </h1>
        <p className="mt-2 text-gray-500">
          Select your profile to view assigned service jobs.
        </p>
      </div>

      {/* Empty state */}
      {technicians.length === 0 ? (
        <div className="rounded-xl border  p-8 text-center">
          <p className="text-gray-600">
            No technicians available.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Please contact admin for assistance.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {technicians.map((t) => (
            <li
              key={t.id}
              className="flex flex-col gap-4 rounded-xl border  p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Info */}
              <div>
                <div className="text-lg font-semibold">
                  {t.name}
                </div>
                <div className="text-sm text-gray-500">
                  {t.phone}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => handleSelect(t.id)}
                className="rounded bg-[var(--accent)] px-6 py-3 font-medium text-white transition hover:opacity-90"
              >
                View Jobs
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
