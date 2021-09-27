import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { FlashMessagesModule } from 'flash-messages-angular';
import { environment } from 'src/environments/environment';

import { AdminDetailsAccessoriesComponent } from './admin-details-accessories.component';

fdescribe('AdminDetailsAccessoriesComponent', () => {
  let component: AdminDetailsAccessoriesComponent;
  let fixture: ComponentFixture<AdminDetailsAccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetailsAccessoriesComponent ],
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
    fixture = TestBed.createComponent(AdminDetailsAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the component with variables set to expected values', () => {
    expect(component.idUpper).toBeUndefined();
    expect(component.idUpperItem).toBeUndefined();
    expect(component.idLower).toBeUndefined();
    expect(component.idLowerItem).toBeUndefined();
    
    expect(component.accessory).toBeUndefined();
    expect(component.accessoryUpper).toBeUndefined();
    expect(component.accessoryItemUpper).toBeUndefined();
    expect(component.accessoryLower).toBeUndefined();
    expect(component.accessoryItemLower).toBeUndefined();
    
 
  });
});
