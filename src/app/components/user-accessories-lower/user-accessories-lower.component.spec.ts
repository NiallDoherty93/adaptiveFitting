import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FlashMessagesModule } from 'flash-messages-angular';
import { environment } from 'src/environments/environment';
import { UserAccessoriesLowerComponent } from './user-accessories-lower.component';

fdescribe('UserAccessoriesLowerComponent', () => {
  let component: UserAccessoriesLowerComponent;
  let fixture: ComponentFixture<UserAccessoriesLowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccessoriesLowerComponent ],
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
    fixture = TestBed.createComponent(UserAccessoriesLowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the component with variables set to expected values', () => {
    expect(component.accessories).toBeDefined();
    expect(component.accessoryName).toBeUndefined();
    
  });
});
