import { z } from "zod";

export const OrderItemSchema = z.object({
  productId: z
    .number("El producto debe ser un número")
    .int("El producto debe ser un número entero")
    .positive("El producto debe ser un ID válido"),
  quantity: z
    .number("La cantidad debe ser un número")
    .int("La cantidad debe ser un número entero")
    .min(1, "La cantidad mínima es 1"),
});

export const CreateOrderSchema = z.object({
  items: z
    .array(OrderItemSchema, { message: "Items debe ser un arreglo de productos" })
    .nonempty("Debe incluir al menos un producto"),
});

export const UpdateOrderStatusSchema = z.object({
  status: z.enum(["pending", "in-progress", "ready"], {
  message: "El estado debe ser pending, in-progress o ready",
  }),
});
