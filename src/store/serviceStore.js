import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useServiceStore = create(
  persist(
    (set) => ({
      // ===== SERVICES =====
      services: [
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
      ],

      // ===== TECHNICIANS =====
      technicians: [
        { id: "t1", name: "Ravi Kumar", phone: "9876543210" },
        { id: "t2", name: "Amit Sharma", phone: "9123456780" },
      ],

      // ===== BOOKINGS =====
      bookings: [],

      // ===== ACTIONS =====
      addTechnician: (technician) =>
        set((state) => ({
          technicians: [...state.technicians, technician],
        })),

      bookService: (booking) =>
        set((state) => ({
          bookings: [...state.bookings, booking],
        })),

      updateBookingStatus: (bookingId, status) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === bookingId ? { ...b, status } : b
          ),
        })),

      assignTechnician: (bookingId, technicianId) =>
        set((state) => {
          const technician = state.technicians.find(
            (t) => t.id === technicianId
          );

          return {
            bookings: state.bookings.map((b) =>
              b.id === bookingId
                ? {
                    ...b,
                    technicianId,
                    technicianName: technician?.name,
                    status: "Assigned",
                  }
                : b
            ),
          };
        }),
    }),
    {
      name: "service-storage",
    }
  )
);
