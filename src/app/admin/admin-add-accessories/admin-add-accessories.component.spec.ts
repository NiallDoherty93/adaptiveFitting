import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FlashMessagesModule } from 'flash-messages-angular';
import { environment } from 'src/environments/environment';

import { AdminAddAccessoriesComponent } from './admin-add-accessories.component';

fdescribe('AdminAddAccessoriesComponent', () => {
  let component: AdminAddAccessoriesComponent;
  let fixture: ComponentFixture<AdminAddAccessoriesComponent>;

  beforeEach(async () => {
    return await TestBed.configureTestingModule({
      declarations: [AdminAddAccessoriesComponent],
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
    fixture = TestBed.createComponent(AdminAddAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the component with variables set to expected values', () => {
    expect(component.accessoryUpper).toBeUndefined();
    expect(component.accessoryItemUpper).toBeUndefined();
    expect(component.accessoryLower).toBeUndefined();
    expect(component.accessoryItemLower).toBeUndefined();
    expect(component.accessory).toBeDefined();
   
  });
});
