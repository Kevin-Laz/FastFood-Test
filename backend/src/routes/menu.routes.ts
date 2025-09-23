import { Router } from "express";
import {
  getMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menu.controller";

const router = Router();

router.get("/", getMenu);

// agregar nuevo producto (solo admin)
router.post("/", addMenuItem);

router.put("/:id", updateMenuItem);

router.delete("/:id", deleteMenuItem);

export default router;
