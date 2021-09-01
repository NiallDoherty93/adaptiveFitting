import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserDetailsComponent } from './user-details.component';

describe('AddUserDetailsComponent', () => {
  let component: AddUserDetailsComponent;
  let fixture: ComponentFixture<AddUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
