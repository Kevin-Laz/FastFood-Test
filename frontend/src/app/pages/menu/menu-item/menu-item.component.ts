import { Component, computed, Input } from '@angular/core';
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
  @Input() img? = '';

  constructor(private cart: CartStore){}

  quantity = computed(() =>
    this.cart.getQuantity({ id: this.id, name: this.name, category: this.category, price: this.price })
  ); // Si la cantidad es menor a 1 entonces el boton remove debe estar desactivado

  add() {
    this.cart.addItem({ id: this.id ,name: this.name, category: this.category, price: this.price });
  }

  remove() {
    this.cart.removeItem({ id: this.id ,name: this.name, category: this.category, price: this.price });
  }
}
