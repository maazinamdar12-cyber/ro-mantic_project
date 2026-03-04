import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { productUpdateSchema } from "@/lib/validation/productSchema";
import mongoose from "mongoose";

/* ================= GET SINGLE PRODUCT ================= */
export async function GET(req, { params }) {

  await connectDB();

  const { id } = await params;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid product ID" },
      { status: 400 }
    );
  }

  try {

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);

  } catch (err) {

    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );

  }
}


/* ================= UPDATE PRODUCT ================= */
export async function PUT(req, { params }) {

  await connectDB();

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid product ID" },
      { status: 400 }
    );
  }

  try {

    const body = await req.json();

    const parsed = productUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const updateData = parsed.data;

    // Prevent empty updates
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No fields provided for update" },
        { status: 400 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProduct);

  } catch (err) {

    console.log(err);

    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );

  }
}


/* ================= DELETE PRODUCT ================= */
export async function DELETE(req, { params }) {

  await connectDB();

  const { id } = await params;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid product ID" },
      { status: 400 }
    );
  }

  try {

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product deleted successfully",
    });

  } catch (err) {

    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );

  }
}