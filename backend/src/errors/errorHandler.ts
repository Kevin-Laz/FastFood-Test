import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";
import { ValidationError } from "./ValidationError";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ValidationError) {
    console.warn('Validation Error -',err.statusCode);
    return res.status(err.statusCode).json({
      status: "error",
      code: "VALIDATION_ERROR",
      errors: err.details,
    });
  }

  if (err instanceof AppError) {
    console.warn('App Error -', err.statusCode);
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error("Error no controlado:", err);

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
