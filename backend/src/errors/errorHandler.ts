import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    console.warn(`${err.statusCode} - ${err.message}`);
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Si es un error inesperado
  console.error("Error no controlado:", err);

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
