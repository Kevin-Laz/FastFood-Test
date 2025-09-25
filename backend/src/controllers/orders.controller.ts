import { Request, Response, NextFunction } from "express";
import { Order, OrderItem } from "../interfaces/order.interface";
import { OrderStatus } from "../interfaces/enums";
import { readJSON, writeJSON } from "../utils/fileManager";
import { AppError } from "../errors/AppError";
import { MenuItem } from "../interfaces/menu.interface";

const FILE_NAME = "orders.json";
const MENU_FILE = "menu.json";

export const getOrders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await readJSON<Order[]>(FILE_NAME);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await readJSON<Order[]>(FILE_NAME);
    const orderId = parseInt(req.params.id, 10);
    const order = orders.find((o) => o.id === orderId);

    if (!order) throw new AppError("Pedido no encontrado", 404);

    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await readJSON<Order[]>(FILE_NAME);
    const menu = await readJSON<MenuItem[]>(MENU_FILE);

    const items: OrderItem[] = req.body.items || [];

    if (items.length === 0) {
      throw new AppError("El pedido debe contener al menos un producto", 400);
    }

    // Validación estricta contra el menú
    let total = 0;
    const validatedItems: OrderItem[] = items.map((item) => {
      const product = menu.find((m) => m.id === item.productId);
      if (!product) {
        throw new AppError(`Producto con id ${item.productId} no existe en el menú`, 400);
      }

      if (item.quantity <= 0) {
        throw new AppError(`Cantidad inválida para producto ${product.name}`, 400);
      }

      total += product.price * item.quantity;
      return { productId: product.id, quantity: item.quantity };
    });

    const newOrder: Order = {
      id: orders.length > 0 ? orders[orders.length - 1].id + 1 : 1,
      items: validatedItems,
      total,
      status: OrderStatus.PENDING,
      createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);
    writeJSON(FILE_NAME, orders);

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await readJSON<Order[]>(FILE_NAME);
    const orderId = parseInt(req.params.id, 10);
    const order = orders.find((o) => o.id === orderId);

    if (!order) throw new AppError("Pedido no encontrado", 404);

    const { status } = req.body;

    if (!Object.values(OrderStatus).includes(status)) {
      throw new AppError("Estado inválido", 400);
    }

    order.status = status;
    writeJSON(FILE_NAME, orders);

    res.json(order);
  } catch (error) {
    next(error);
  }
};
