import { Component, NgModule, OnInit } from '@angular/core';
import { Order } from '../../../../models/order.model';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../services/api/order/order.service';

@Component({
  selector: 'app-order-list',
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  error: string | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar órdenes';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
