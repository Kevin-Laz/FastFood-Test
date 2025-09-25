import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSummaryComponent } from './menu-summary.component';

describe('MenuSummaryComponent', () => {
  let component: MenuSummaryComponent;
  let fixture: ComponentFixture<MenuSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSummaryComponent]
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
