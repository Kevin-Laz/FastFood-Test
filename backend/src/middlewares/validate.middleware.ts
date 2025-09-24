import { ZodError, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { ValidationError  } from "../errors/ValidationError";

export const validate =
  (schema: ZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (result.success) {
      req.body = result.data;
      return next();
    }

    const errors = result.error.issues.map(i => ({
      field: i.path.join(".") || "root",
      message: i.message,
      code: i.code,
    }));

    return next(new ValidationError(errors));
  };
