import { connectDB } from "@/lib/mongodb";
import ServiceBooking from "@/models/ServiceBooking";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const {id} = await params;

    const data = await req.json();

    const updated = await ServiceBooking.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const {id} = await params;

    const deleted = await ServiceBooking.findByIdAndDelete(
      id
    );

    if (!deleted) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}
