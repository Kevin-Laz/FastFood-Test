export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
}

export interface CreateOrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
}
