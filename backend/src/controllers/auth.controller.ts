import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../interfaces/user.interface";
import { readJSON } from "../utils/fileManager";
import { AppError } from "../errors/AppError";

const FILE_NAME = "users.json";

const JWT_SECRET = process.env.JWT_SECRET || "clavesecreta";
const JWT_EXPIRES = "4h";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) throw new AppError("Usuario y contraseña son requeridos", 400);

    const users = await readJSON<User[]>(FILE_NAME);
    const user = users.find((u) => u.username === username);

    if (!user) throw new AppError("Credenciales inválidas", 401);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new AppError("Credenciales inválidas", 401);

    // Generar token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
