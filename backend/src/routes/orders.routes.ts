import { Router } from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} from "../controllers/orders.controller";

const router = Router();

router.get("/", getOrders);

router.get("/:id", getOrderById);

router.post("/", createOrder);

router.put("/:id/status", updateOrderStatus);

export default router;
