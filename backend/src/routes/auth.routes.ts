import { Router } from "express";
import { login } from "../controllers/auth.controller";

const router = Router();


// Login de usuario (admin/cocinero)
router.post("/login", login);

export default router;
