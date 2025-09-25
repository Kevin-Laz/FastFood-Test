import { Injectable, signal, computed } from '@angular/core';
import { CartItem, MenuItem } from '../../../models/menu.model';


@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();

  readonly totalQuantity = computed(() =>
    this._items().reduce((acc, ci) => acc + ci.quantity, 0)
  );

  readonly totalPrice = computed(() =>
    this._items().reduce((acc, ci) => acc + ci.quantity * ci.item.price, 0)
  );

  addItem(item: MenuItem) {
    const existing = this._items().find(ci => ci.item.name === item.name);
    if (existing) {
      this._items.update(list =>
        list.map(ci =>
          ci.item.name === item.name ? { ...ci, quantity: ci.quantity + 1 } : ci
        )
      );
    } else {
      this._items.update(list => [...list, { item, quantity: 1 }]);
    }
  }

  removeItem(item: MenuItem) {
    this._items.update(list =>
      list
        .map(ci =>
          ci.item.name === item.name
            ? { ...ci, quantity: ci.quantity - 1 }
            : ci
        )
        .filter(ci => ci.quantity > 0)
    );
  }
}
