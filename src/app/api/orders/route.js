import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/validation/orderSchema";
import { verifyToken } from "@/lib/auth";
import mongoose from "mongoose";

/* ================= GET ORDERS ================= */

export async function GET(req) {
  try {
      const token = req.cookies.get("token")?.value;
    
        if (!token) {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
        }
    await connectDB();

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    let orders;

    // Admin → all orders
    if (user.role === "admin") {
      orders = await Order.find().sort({ createdAt: -1 });
    } else {
      // User → only their orders
      orders = await Order.find({
        userId: new mongoose.Types.ObjectId(user.userId),
      }).sort({ createdAt: -1 });
    }

    return NextResponse.json(orders);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

/* ================= CREATE ORDER ================= */

export async function POST(req) {
  try {
    const token = req.cookies.get("token")?.value;
    
        if (!token) {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
        }
    await connectDB();

      const user = verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { customerName, phone, address, items } = parsed.data;

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      userId: user.userId,
      customerName: customerName.trim(),
      phone,
      address: address.trim(),
      items,
      totalAmount,
      status: "Processing",
    });

    return NextResponse.json(order, { status: 201 });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
}