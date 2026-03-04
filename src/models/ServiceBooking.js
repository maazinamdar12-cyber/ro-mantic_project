import mongoose from "mongoose";

const ServiceBookingSchema = new mongoose.Schema(
  {
    serviceId: {
      type: String,
      required: true,
    },

    serviceName: {
      type: String,
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    technicianId: {
      type: String,
      default: null,
    },

    technicianName: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Assigned",
        "In Progress",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.ServiceBooking ||
  mongoose.model("ServiceBooking", ServiceBookingSchema);
