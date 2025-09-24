import { z } from "zod";

export const CreateMenuItemSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre del producto debe tener al menos 2 caracteres"),
  price: z
    .number()
    .positive("El precio debe ser mayor que 0"),
  category: z
    .string()
    .min(2, "La categoría debe tener al menos 2 caracteres")
});

export const UpdateMenuItemSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre del producto debe tener al menos 2 caracteres")
    .optional(),
  price: z
    .number()
    .positive("El precio debe ser mayor que 0")
    .optional(),
  category: z
    .string()
    .min(2, "La categoría debe tener al menos 2 caracteres")
    .optional()
});
