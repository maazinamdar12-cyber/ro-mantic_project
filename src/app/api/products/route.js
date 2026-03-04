import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { productSchema } from "@/lib/validation/productSchema";

export async function GET() {

  await connectDB();

  try {

    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json(products);

  } catch (err) {

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );

  }
}

export async function POST(req) {

  await connectDB();

  try {

    const body = await req.json();

    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, price, description, image } = parsed.data;

    const product = await Product.create({
      name: name.trim(),
      price,
      description: description.trim(),
      image,
    });

    return NextResponse.json(product, { status: 201 });

  } catch (err) {

    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );

  }
}