import { Component } from '@angular/core';
import { OrderListComponent } from '../orders/order-list/order-list.component';
import { OrderSummaryComponent } from '../orders/order-summary/order-summary.component';

@Component({
  selector: 'app-kitchen-dashboard',
  imports: [OrderListComponent, OrderSummaryComponent],
  templateUrl: './kitchen-dashboard.component.html',
  styleUrl: './kitchen-dashboard.component.scss'
})
export class KitchenDashboardComponent {

}
