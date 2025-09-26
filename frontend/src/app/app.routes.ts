import { Routes } from '@angular/router';
import { MenuDashboardComponent } from './pages/menu/menu-dashboard/menu-dashboard.component';
import { KitchenDashboardComponent } from './pages/kitchen/kitchen-dashboard/kitchen-dashboard.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { authGuard } from './services/api/auth/auth.guard';

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
    component: KitchenDashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: '**', // cualquier ruta que no exista
    redirectTo: '', // redirige al menú principal
    pathMatch: 'full'
  }
];
