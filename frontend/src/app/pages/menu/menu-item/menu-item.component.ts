import { Component, Input } from '@angular/core';
import { CartStore } from '../services/cart.store';

@Component({
  selector: 'app-menu-item',
  imports: [],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @Input() name = 'Hamburguesa';
  @Input() category = 'Categoria';
  @Input() price = 11;
  @Input() id = -1;

  constructor(private cart: CartStore){}

  add() {
    this.cart.addItem({ id: 1,name: this.name, category: this.category, price: this.price });
  }

  remove() {
    this.cart.removeItem({ id: 1,name: this.name, category: this.category, price: this.price });
  }
}
