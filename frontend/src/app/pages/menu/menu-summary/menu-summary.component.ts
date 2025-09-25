import { Component } from '@angular/core';
import { CartStore } from '../services/cart.store';
import { OrderService } from '../../../services/api/order/order.service';

@Component({
  selector: 'app-menu-summary',
  imports: [],
  templateUrl: './menu-summary.component.html',
  styleUrl: './menu-summary.component.scss'
})
export class MenuSummaryComponent {
  constructor(public cart: CartStore, private orderService: OrderService){}

  realizarPedido() {
    const items = this.cart.items().map(ci => ({
      productId: ci.item.id,
      quantity: ci.quantity
    }));

    this.orderService.createOrder(items).subscribe({
      next: (order) => {
        console.log('Pedido creado:', order);
      },
      error: (err) => console.error('Error al crear pedido', err)
    });
  }
}
