import { z } from "zod";


/* MongoDB ObjectId validator */
const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

export const orderSchema = z.object({
  // orderId: objectId,

  customerName: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  address: z
    .string()
    .min(10, "Address must be at least 10 characters"),

  items: z.array(
    z.object({
      productId: objectId,
      name: z.string(),
      price: z.number().positive(),
      quantity: z.number().int().min(1)
    })
  ),

  totalAmount: z.number().positive()
});


export const orderStatusSchema = z.object({
  status: z.enum([
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled"
  ])
});