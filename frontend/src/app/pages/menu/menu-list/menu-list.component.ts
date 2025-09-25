import { Component, OnInit } from '@angular/core';
import { MenuItemComponent } from "../menu-item/menu-item.component";
import { PaginadorComponent } from '../../../shared/components/paginador/paginador.component';
import { MenuItem } from '../../../models/menu.model';
import { MenuService } from '../../../services/api/menu/menu.service';

@Component({
  selector: 'app-menu-list',
  imports: [MenuItemComponent, PaginadorComponent],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss'
})
export class MenuListComponent implements OnInit{
  dishes: MenuItem[] = [];
  pagedDishes: MenuItem[] = [];

  page = 1;
  totalPages = 1;
  readonly pageSize = 6;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenu().subscribe({
      next: (data) => {
        this.dishes = [...data, ...data, ...data];
        this.totalPages = Math.ceil(this.dishes.length / this.pageSize);
        this.updatePagedDishes();
      },
      error: (err) => console.error('Error cargando menú', err),
    });
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.updatePagedDishes();
  }

  private updatePagedDishes() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedDishes = this.dishes.slice(start, end);
  }
}
