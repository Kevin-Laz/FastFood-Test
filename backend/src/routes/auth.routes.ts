import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { LoginSchema } from "../schemas/auth.schema";

const router = Router();


// Login de usuario (admin/cocinero)
router.post("/login", validate(LoginSchema), login);

export default router;
