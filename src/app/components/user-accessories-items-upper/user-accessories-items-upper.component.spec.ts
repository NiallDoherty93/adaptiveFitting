import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccessoriesItemsUpperComponent } from './user-accessories-items-upper.component';

describe('UserAccessoriesItemsUpperComponent', () => {
  let component: UserAccessoriesItemsUpperComponent;
  let fixture: ComponentFixture<UserAccessoriesItemsUpperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccessoriesItemsUpperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccessoriesItemsUpperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
