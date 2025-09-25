import { Component } from '@angular/core';
import { MenuSummaryComponent } from '../menu-summary/menu-summary.component';
import { MenuListComponent } from '../menu-list/menu-list.component';

@Component({
  selector: 'app-menu-dashboard',
  imports: [MenuSummaryComponent, MenuListComponent],
  templateUrl: './menu-dashboard.component.html',
  styleUrl: './menu-dashboard.component.scss'
})
export class MenuDashboardComponent {

}
