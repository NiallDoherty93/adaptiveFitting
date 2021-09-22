import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailsClientComponent } from './admin-details-client.component';

describe('AdminDetailsClientComponent', () => {
  let component: AdminDetailsClientComponent;
  let fixture: ComponentFixture<AdminDetailsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetailsClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDetailsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
