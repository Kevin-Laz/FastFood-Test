import { Request, Response } from "express";

export const getMenu = (_req: Request, res: Response) => {
  return res.json({ message: "GET /menu funcionando" });
};

export const addMenuItem = (req: Request, res: Response) => {
  return res.json({
    message: "POST /menu funcionando",
    body: req.body,
  });
};

export const updateMenuItem = (req: Request, res: Response) => {
  return res.json({
    message: `PUT /menu/${req.params.id} funcionando`,
    body: req.body,
  });
};

export const deleteMenuItem = (req: Request, res: Response) => {
  return res.json({
    message: `DELETE /menu/${req.params.id} funcionando`,
  });
};
