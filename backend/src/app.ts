import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import menuRoutes from "./routes/menu.routes";
import ordersRoutes from "./routes/orders.routes";

import { errorHandler } from "./errors/errorHandler";


const app = express();

app.use(cors());
app.use(express.json());

// Rutas principales /api
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", ordersRoutes);

// Middleware global de errores
app.use(errorHandler);

export default app;
