import { NextResponse } from "next/server";
import { orderStatusSchema } from "@/lib/validation/orderSchema";
import {connectDB} from "@/lib/mongodb";
import Order from "@/models/Order";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    let {id} = await params;
    const body = await req.json();

    const result = orderStatusSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: result.data.status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Order status updated",
      order: updatedOrder
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 }
    );
  }
}