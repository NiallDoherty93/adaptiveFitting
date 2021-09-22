import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPermissionsClientComponent } from './admin-permissions-client.component';

describe('AdminPermissionsClientComponent', () => {
  let component: AdminPermissionsClientComponent;
  let fixture: ComponentFixture<AdminPermissionsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPermissionsClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPermissionsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
