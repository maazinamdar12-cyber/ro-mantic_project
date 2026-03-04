import { connectDB } from "@/lib/mongodb";
import Technician from "@/models/Technician";
import { NextResponse } from "next/server";

/* ================= UPDATE TECHNICIAN ================= */
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const technician = await Technician.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!technician) {
      return NextResponse.json(
        { message: "Technician not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(technician);
  } catch (error) {
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}

/* ================= DELETE TECHNICIAN ================= */
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await  params;

    const technician = await Technician.findByIdAndDelete(
      id
    );

    if (!technician) {
      return NextResponse.json(
        { message: "Technician not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Technician deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}
