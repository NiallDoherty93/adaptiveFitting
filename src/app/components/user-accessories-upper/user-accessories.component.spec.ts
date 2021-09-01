import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccessoriesComponent } from './user-accessories.component';

describe('UserAccessoriesComponent', () => {
  let component: UserAccessoriesComponent;
  let fixture: ComponentFixture<UserAccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccessoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
