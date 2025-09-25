import { Routes } from '@angular/router';
import { MenuDashboardComponent } from './pages/menu/menu-dashboard/menu-dashboard.component';
import { KitchenDashboardComponent } from './pages/kitchen/kitchen-dashboard/kitchen-dashboard.component';
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: MenuDashboardComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'kitchen',
    component: KitchenDashboardComponent
  }
];
