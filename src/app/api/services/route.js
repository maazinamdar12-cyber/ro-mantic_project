import { connectDB } from "@/lib/mongodb";
import ServiceBooking from "@/models/ServiceBooking";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth"; // YOU must implement this

export async function GET(req) {
  try {
    await connectDB();

    // 🔐 Get token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 🔐 Verify token
    const user = verifyToken(token);
    console.log(user)
    if (!user) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    let bookings;

    // ✅ ADMIN → get all bookings
    if (user.role === "admin") {
      bookings = await ServiceBooking.find().sort({
        createdAt: -1,
      });
    } else {
      // ✅ USER → get only their bookings
      bookings = await ServiceBooking.find({
        userId: user.userId, // IMPORTANT: must exist in schema
      }).sort({ createdAt: -1 });
    }

    return NextResponse.json({
      bookings,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
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
