import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UserRole } from "../interfaces/enums";
import { TokenPayload } from "../interfaces/auth.interface";

const JWT_SECRET = process.env.JWT_SECRET || "clavesecreta";

// Middleware general: validar token
export const authenticate = ( req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("No autorizado: token faltante", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    (req as any).user = decoded; // guardamos user en request
    next();
  } catch (err) {
    return next(new AppError("Token inválido o expirado", 401));
  }
};

// Middleware para roles específicos
export const authorize =
  (...roles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) return next(new AppError("No autorizado", 401));
    if (!roles.includes(user.role)) return next(new AppError("Acceso denegado", 403));

    next();
  };
