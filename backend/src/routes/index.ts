import { Router } from "express";

const router = Router();

router.get("/menu", (req, res) => {
  res.json([{ id: 1, name: "Hamburguesa", price: 10 }]);
});

export default router;
