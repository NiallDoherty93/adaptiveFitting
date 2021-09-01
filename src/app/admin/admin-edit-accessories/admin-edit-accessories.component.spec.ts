import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditAccessoriesComponent } from './admin-edit-accessories.component';

describe('AdminEditAccessoriesComponent', () => {
  let component: AdminEditAccessoriesComponent;
  let fixture: ComponentFixture<AdminEditAccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditAccessoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
