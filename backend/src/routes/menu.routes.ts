import { Router } from "express";
import {
  getMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menu.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../interfaces/enums";
import { validate } from "../middlewares/validate.middleware";
import { CreateMenuItemSchema, UpdateMenuItemSchema } from "../schemas/menu.schema";


const router = Router();

// Público: ver menú
router.get("/", getMenu);

// Protegido: Solo admin puede modificar menú
router.post("/", authenticate, authorize(UserRole.ADMIN), validate(CreateMenuItemSchema), addMenuItem);
router.put("/:id", authenticate, authorize(UserRole.ADMIN), validate(UpdateMenuItemSchema), updateMenuItem);
router.delete("/:id", authenticate, authorize(UserRole.ADMIN), deleteMenuItem);

export default router;
