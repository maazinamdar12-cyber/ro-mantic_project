import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { registerSchema } from "@/lib/validation/registerSchema";

export async function POST(req) {
  try {
    await connectDB();

    let body;

    // Safely parse JSON
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    // Validate input using Zod
    const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
  const message =
    parsed.error.issues?.[0]?.message || "Invalid input";

  return NextResponse.json(
    { message },
    { status: 400 }
  );
}

    const { name, email, password, phone } = parsed.data;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "user",
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}