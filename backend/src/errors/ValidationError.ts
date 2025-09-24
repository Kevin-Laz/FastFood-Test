import { AppError } from "./AppError";

export class ValidationError extends AppError {
  public details: any[];

  constructor(details: any[]) {
    super("Error de validación", 400, true);
    this.details = details;
  }
}
