import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenDashboardComponent } from './kitchen-dashboard.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('KitchenDashboardComponent', () => {
  let component: KitchenDashboardComponent;
  let fixture: ComponentFixture<KitchenDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenDashboardComponent],
      providers: [provideHttpClient(),
        provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitchenDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
