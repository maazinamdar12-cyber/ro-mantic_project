import { connectDB } from "@/lib/mongodb";
import Technician from "@/models/Technician";
import { NextResponse } from "next/server";

/* ================= GET ALL TECHNICIANS ================= */
export async function GET() {
  try {
    await connectDB();

    const technicians = await Technician.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(technicians);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch technicians" },
      { status: 500 }
    );
  }
}

/* ================= CREATE TECHNICIAN ================= */
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const technician = await Technician.create({
      name: body.name,
      phone: body.phone,
    });

    return NextResponse.json(technician, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create technician" },
      { status: 500 }
    );
  }
}
