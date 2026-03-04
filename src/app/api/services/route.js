import { connectDB } from "@/lib/mongodb";
import ServiceBooking from "@/models/ServiceBooking";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const bookings = await ServiceBooking.find().sort({
    createdAt: -1,
  });

  return NextResponse.json(bookings);
}

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    const booking = await ServiceBooking.create(data);

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create booking" },
      { status: 500 }
    );
  }
}
