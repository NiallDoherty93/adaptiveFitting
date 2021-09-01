import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccessoriesComponent } from './admin-accessories.component';

describe('AdminAccessoriesComponent', () => {
  let component: AdminAccessoriesComponent;
  let fixture: ComponentFixture<AdminAccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAccessoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
