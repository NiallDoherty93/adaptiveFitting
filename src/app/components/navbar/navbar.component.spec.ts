import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { FlashMessagesModule } from 'flash-messages-angular';
import { environment } from 'src/environments/environment';

import { NavbarComponent } from './navbar.component';

fdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase, 'TailorU'),
        FlashMessagesModule.forRoot()
        
    ],
    providers: [AngularFirestore]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the component with variables set to expected values', () => {
    expect(component.isLoggedIn).toBeUndefined();
    expect(component.loggedInUser).toBeUndefined();
    expect(component.showRegister).toBeUndefined();
    expect(component.loggedInUserUid).toBeUndefined();
    expect(component.isUserAdmin).toBeUndefined();
    expect(component.isUserTailor).toBeUndefined();

  });
});
