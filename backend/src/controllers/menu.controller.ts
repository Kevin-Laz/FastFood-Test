import { Request, Response, NextFunction } from "express";
import { MenuItem } from "../interfaces/menu.interface";
import { readJSON, writeJSON } from "../utils/fileManager";
import { AppError } from "../errors/AppError";

const FILE_NAME = "menu.json";

export const getMenu = (_req: Request, res: Response, next: NextFunction) => {
  try {
    const menu = readJSON<MenuItem[]>(FILE_NAME);
    res.json(menu);
  } catch (error) {
    next(error);
  }
};

export const addMenuItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const menu = readJSON<MenuItem[]>(FILE_NAME);

    const newItem: MenuItem = {
      id: menu.length > 0 ? menu[menu.length - 1].id + 1 : 1,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    menu.push(newItem);
    writeJSON(FILE_NAME, menu);

    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

export const updateMenuItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const menu = readJSON<MenuItem[]>(FILE_NAME);
    const itemId = parseInt(req.params.id, 10);
    const index = menu.findIndex((item) => item.id === itemId);

    if (index === -1) {
      throw new AppError("Producto no encontrado", 404);
    }

    menu[index] = { ...menu[index], ...req.body };
    writeJSON(FILE_NAME, menu);

    res.json(menu[index]);
  } catch (error) {
    next(error);
  }
};

export const deleteMenuItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const menu = readJSON<MenuItem[]>(FILE_NAME);
    const itemId = parseInt(req.params.id, 10);
    const newMenu = menu.filter((item) => item.id !== itemId);

    if (newMenu.length === menu.length) {
      throw new AppError("Producto no encontrado", 404);
    }

    writeJSON(FILE_NAME, newMenu);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};
