import { connectDB } from "@/lib/mongodb";
import { seedAdmin } from "@/lib/seedAdmin";
import { seedProducts } from "@/lib/seedProduct";

export const runtime = "nodejs";

export async function GET() {
  await connectDB();

  await seedAdmin();
  await seedProducts();

  return Response.json({ success: true });
}
