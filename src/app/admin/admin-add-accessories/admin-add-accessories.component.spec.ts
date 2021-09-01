import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAccessoriesComponent } from './admin-add-accessories.component';

describe('AdminAddAccessoriesComponent', () => {
  let component: AdminAddAccessoriesComponent;
  let fixture: ComponentFixture<AdminAddAccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddAccessoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
