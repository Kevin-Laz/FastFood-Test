import { Component, signal } from '@angular/core';
import { MenuSummaryComponent } from '../menu-summary/menu-summary.component';
import { MenuListComponent } from '../menu-list/menu-list.component';
import { CartStore } from '../services/cart.store';

@Component({
  selector: 'app-menu-dashboard',
  imports: [MenuSummaryComponent, MenuListComponent],
  templateUrl: './menu-dashboard.component.html',
  styleUrl: './menu-dashboard.component.scss'
})
export class MenuDashboardComponent {
  pedidoRealizado = signal(false);

  constructor(private cart: CartStore){}

  onPedidoRealizado() {
    this.pedidoRealizado.set(true);
  }

  nuevoPedido() {
    this.cart.clear(); // limpia el carrito
    this.pedidoRealizado.set(false);
  }
}
