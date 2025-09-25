import { Component } from '@angular/core';
import { OrderService } from '../../../../services/api/order/order.service';
import { Order } from '../../../../models/order.model';

@Component({
  selector: 'app-order-summary',
  imports: [],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {
  pending = 0;
  inProgress = 0;
  completed = 0;
  loading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary() {
    this.orderService.getOrders().subscribe({
      next: (orders: Order[]) => {
        this.pending = orders.filter(o => o.status === 'pending').length;
        this.inProgress = orders.filter(o => o.status === 'in_progress').length;
        this.completed = orders.filter(o => o.status === 'completed').length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando resumen', err);
        this.loading = false;
      }
    });
  }
}
