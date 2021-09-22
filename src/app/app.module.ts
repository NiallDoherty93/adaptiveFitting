import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderDashComponent } from './components/order-dash/order-dash.component';
import { OrderItemsComponent } from './components/order-items/order-items.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth.service';
import { ItemsService } from './services/items.service';
import { UserService } from './services/user.service';

import { FlashMessagesModule } from 'flash-messages-angular';
import { AddUserDetailsComponent } from './components/profile/user-details/user-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserMeasurementsComponent } from './components/profile/user-measurements/user-measurements.component';
import { UserAccessoriesComponent } from './components/user-accessories-upper/user-accessories.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FiltersComponent } from './components/filters/filters.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminDashComponent } from './admin/admin-dash/admin-dash.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminAddProductComponent } from './admin/admin-add-product/admin-add-product.component';
import { AdminEditProductComponent } from './admin/admin-edit-product/admin-edit-product.component';
import { AdminDetailsProductComponent } from './admin/admin-details-product/admin-details-product.component';
import { AdminSettingsComponent } from './admin/admin-settings/admin-settings.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserAccessoriesItemsUpperComponent } from './components/user-accessories-items-upper/user-accessories-items-upper.component';
import { UserAccessoriesLowerComponent } from './components/user-accessories-lower/user-accessories-lower.component';
import { UserAccessoriesItemsLowerComponent } from './components/user-accessories-items-lower/user-accessories-items-lower.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminAddAccessoriesComponent } from './admin/admin-add-accessories/admin-add-accessories.component';
import { AdminDetailsAccessoriesComponent } from './admin/admin-details-accessories/admin-details-accessories.component';
import { AdminEditAccessoriesComponent } from './admin/admin-edit-accessories/admin-edit-accessories.component';
import { AdminAccessoriesComponent } from './admin/admin-accessories/admin-accessories.component';
import { OrdersComponent } from './tailor/orders/orders.component';
import { OrderDashboardComponent } from './tailor/order-dashboard/order-dashboard.component';
import { UserOrdersComponent } from './components/profile/user-orders/user-orders.component';
import { UserOrderDetailsComponent } from './components/profile/user-order-details/user-order-details.component';
import { OrderDetailsComponent } from './tailor/order-details/order-details.component';
import { AdminClientsComponent } from './admin/admin-clients/admin-clients.component';
import { AdminDetailsClientComponent } from './admin/admin-details-client/admin-details-client.component';
import { OrdersService } from './services/orders.service';
import { AdminPermissionsClientComponent } from './admin/admin-permissions-client/admin-permissions-client.component';
// import { AdminClientPermissionsComponent } from './admin/admin-client-permissions/admin-client-permissions.component';
















@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OrderDashComponent,
    OrderItemsComponent,
   
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    AddUserDetailsComponent,
    ProfileComponent,
    UserMeasurementsComponent,
    UserAccessoriesComponent,
    ShoppingCartComponent,
    FiltersComponent,
    CartItemComponent,
    AdminDashComponent,
    AdminProductsComponent,
    AdminAddProductComponent,
    AdminEditProductComponent,
    AdminDetailsProductComponent,
    AdminSettingsComponent,
    SidebarComponent,
    UserAccessoriesItemsUpperComponent,
    UserAccessoriesLowerComponent,
    UserAccessoriesItemsLowerComponent,
    OrderSummaryComponent,
    CheckoutComponent,
    AdminAddAccessoriesComponent,
    AdminDetailsAccessoriesComponent,
    AdminEditAccessoriesComponent,
    AdminAccessoriesComponent,
    OrdersComponent,
    OrderDashboardComponent,
    UserOrdersComponent,
    UserOrderDetailsComponent,
    OrderDetailsComponent,
    AdminClientsComponent,
    AdminDetailsClientComponent,
    AdminPermissionsClientComponent,
    // AdminClientPermissionsComponent,
  

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'TailorU'),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    FormsModule, NgbModule,
    AngularFireDatabaseModule
    
    
  ],
  providers: [AuthService, ItemsService,  UserService, ShoppingCartService, OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
