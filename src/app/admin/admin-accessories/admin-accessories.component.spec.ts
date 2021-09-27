import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { FlashMessagesModule } from 'flash-messages-angular';
import { environment } from 'src/environments/environment';
import { AdminAccessoriesComponent } from './admin-accessories.component';

fdescribe('AdminAccessoriesComponent', () => {
  let component: AdminAccessoriesComponent;
  let fixture: ComponentFixture<AdminAccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAccessoriesComponent ],
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
    fixture = TestBed.createComponent(AdminAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // component should be created
  it('should create', () => {
    expect(component).toBeTruthy();
  });
// variables listed should be defined
 it('should create the component with variables set to expected values', () => {
    expect(component.accessories).toBeDefined();
    expect(component.accessoriesUpper).toBeDefined();
    expect(component.accessoriesItemsUpper).toBeDefined();
    expect(component.accessoriesLower).toBeDefined();
    expect(component.accessoriesItemsLower).toBeDefined();
    
    expect(component.subscriptionUpper).toBeDefined();
    expect(component.subscriptionItemUpper).toBeDefined();
    expect(component.subscriptionLower).toBeDefined();
    expect(component.subscriptionItemLower).toBeDefined();
    
    expect(component.filteredAccessoryUpper).toBeDefined();
    expect(component.filteredAccessoryItemUpper).toBeDefined();
    expect(component.filteredAccessoryLower).toBeDefined();
    expect(component.filteredAccessoryItemLower).toBeDefined();
  });
});
