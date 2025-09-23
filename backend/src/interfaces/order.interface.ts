import { OrderStatus } from "./enums";

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}
