import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { FlashMessagesModule } from 'flash-messages-angular';
import { environment } from 'src/environments/environment';

import { AdminDashComponent } from './admin-dash.component';

fdescribe('AdminDashComponent', () => {
  let component: AdminDashComponent;
  let fixture: ComponentFixture<AdminDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashComponent ],
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
    fixture = TestBed.createComponent(AdminDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
