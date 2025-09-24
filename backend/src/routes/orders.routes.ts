import { Router } from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} from "../controllers/orders.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../interfaces/enums";
import { CreateOrderSchema, UpdateOrderStatusSchema } from "../schemas/order.schema";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

//público : no hace falta registrase para crear pedido
router.post("/", validate(CreateOrderSchema), createOrder);

//Ver pedidos: solo cocinero o admin
router.get("/", authenticate, authorize(UserRole.COOK, UserRole.ADMIN), getOrders);
router.get("/:id", authenticate, authorize(UserRole.COOK, UserRole.ADMIN), getOrderById);


// Cambiar estado del pedido: solo cocinero o admin
router.put("/:id/status", authenticate, authorize(UserRole.COOK, UserRole.ADMIN), validate(UpdateOrderStatusSchema), updateOrderStatus);

export default router;
