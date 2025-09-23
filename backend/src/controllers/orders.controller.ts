import { Request, Response } from "express";

export const getOrders = (_req: Request, res: Response) => {
  return res.json({ message: "GET /orders funcionando" });
};

export const getOrderById = (req: Request, res: Response) => {
  return res.json({
    message: `GET /orders/${req.params.id} funcionando`,
  });
};

export const createOrder = (req: Request, res: Response) => {
  return res.json({
    message: "POST /orders funcionando",
    body: req.body,
  });
};

export const updateOrderStatus = (req: Request, res: Response) => {
  return res.json({
    message: `PUT /orders/${req.params.id}/status funcionando`,
    body: req.body,
  });
};
