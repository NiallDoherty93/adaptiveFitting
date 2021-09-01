import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccessoriesLowerComponent } from './user-accessories-lower.component';

describe('UserAccessoriesLowerComponent', () => {
  let component: UserAccessoriesLowerComponent;
  let fixture: ComponentFixture<UserAccessoriesLowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccessoriesLowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccessoriesLowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
