import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailsAccessoriesComponent } from './admin-details-accessories.component';

describe('AdminDetailsAccessoriesComponent', () => {
  let component: AdminDetailsAccessoriesComponent;
  let fixture: ComponentFixture<AdminDetailsAccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetailsAccessoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDetailsAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
