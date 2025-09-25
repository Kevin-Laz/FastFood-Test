import { Component } from '@angular/core';
import { MenuItemComponent } from "../menu-item/menu-item.component";

@Component({
  selector: 'app-menu-list',
  imports: [MenuItemComponent],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss'
})
export class MenuListComponent {

}
