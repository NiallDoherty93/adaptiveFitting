import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMeasurementsComponent } from './user-measurements.component';

describe('UserMeasurementsComponent', () => {
  let component: UserMeasurementsComponent;
  let fixture: ComponentFixture<UserMeasurementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMeasurementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
