import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string().lowercase("email should be lowercase")
    .email("Enter a valid email"),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone must be 10 digits"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
});