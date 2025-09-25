import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSummaryComponent } from './menu-summary.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('MenuSummaryComponent', () => {
  let component: MenuSummaryComponent;
  let fixture: ComponentFixture<MenuSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSummaryComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
