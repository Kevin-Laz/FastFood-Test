import { UserRole } from "./enums";

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}
