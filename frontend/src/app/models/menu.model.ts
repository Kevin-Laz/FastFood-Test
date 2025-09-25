export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  img?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}
