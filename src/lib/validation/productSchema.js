import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Product name must be at least 3 characters"),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters"),

  image: z
    .string()
    .url("Image must be a valid URL"),
});

export const productUpdateSchema = productSchema.partial();