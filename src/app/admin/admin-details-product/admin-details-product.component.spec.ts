import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailsProductComponent } from './admin-details-product.component';

describe('AdminDetailsProductComponent', () => {
  let component: AdminDetailsProductComponent;
  let fixture: ComponentFixture<AdminDetailsProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetailsProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDetailsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
