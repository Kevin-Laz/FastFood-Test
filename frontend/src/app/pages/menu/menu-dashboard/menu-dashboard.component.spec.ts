import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDashboardComponent } from './menu-dashboard.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('MenuDashboardComponent', () => {
  let component: MenuDashboardComponent;
  let fixture: ComponentFixture<MenuDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDashboardComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
