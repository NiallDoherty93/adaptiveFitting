import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FlashMessagesModule } from 'flash-messages-angular';
import { environment } from 'src/environments/environment';

import { AdminPermissionsClientComponent } from './admin-permissions-client.component';

fdescribe('AdminPermissionsClientComponent', () => {
  let component: AdminPermissionsClientComponent;
  let fixture: ComponentFixture<AdminPermissionsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPermissionsClientComponent ],
      imports: [
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase, 'TailorU'),
        FlashMessagesModule.forRoot(),
        FormsModule
        
    ],
    providers: [AngularFirestore]
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
  it('should create the component with variables set to expected values', () => {
    expect(component.id).toBeUndefined();
    expect(component.user).toBeUndefined();
    expect(component.isAdmin).toBeUndefined();
    expect(component.isTailor).toBeUndefined();
    expect(component.userRoles).toBeUndefined();
    expect(component.value).toBeUndefined();
    
  
  });
});
