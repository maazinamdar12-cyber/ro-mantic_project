import bcrypt from "bcryptjs";
import User from "@/models/User";

export async function seedAdmin() {
  const adminEmail = "admin@example.com";
  const adminPassword = "admin123";

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log("ℹ️ Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await User.create({
    name: "Admin",
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
  });

  console.log("🚀 Admin user created");
}
