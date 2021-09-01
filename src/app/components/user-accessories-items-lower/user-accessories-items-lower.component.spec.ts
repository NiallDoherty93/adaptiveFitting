import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccessoriesItemsLowerComponent } from './user-accessories-items-lower.component';

describe('UserAccessoriesItemsLowerComponent', () => {
  let component: UserAccessoriesItemsLowerComponent;
  let fixture: ComponentFixture<UserAccessoriesItemsLowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccessoriesItemsLowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccessoriesItemsLowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
