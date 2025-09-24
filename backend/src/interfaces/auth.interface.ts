import { UserRole } from "./enums";

export interface TokenPayload {
  id: number;
  role: UserRole;
  iat: number;
  exp: number;
}