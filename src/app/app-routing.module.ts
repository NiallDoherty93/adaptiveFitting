import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { OrderDashComponent } from './components/order-dash/order-dash.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddUserDetailsComponent } from './components/profile/user-details/user-details.component';
import { AdminDashComponent } from './admin/admin-dash/admin-dash.component';
import { AdminDetailsProductComponent } from './admin/admin-details-product/admin-details-product.component';
import { AdminEditProductComponent } from './admin/admin-edit-product/admin-edit-product.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminAddProductComponent } from './admin/admin-add-product/admin-add-product.component';
import { AdminAddAccessoriesComponent } from './admin/admin-add-accessories/admin-add-accessories.component';
import { AdminDetailsAccessoriesComponent } from './admin/admin-details-accessories/admin-details-accessories.component';
import { AdminEditAccessoriesComponent } from './admin/admin-edit-accessories/admin-edit-accessories.component';
import { AdminAccessoriesComponent } from './admin/admin-accessories/admin-accessories.component';
import { AdminClientsComponent } from './admin/admin-clients/admin-clients.component';
import { AdminDetailsClientComponent } from './admin/admin-details-client/admin-details-client.component';
import { AdminPermissionsClientComponent } from './admin/admin-permissions-client/admin-permissions-client.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { UserAccessoriesComponent } from './components/user-accessories-upper/user-accessories.component';
import { UserAccessoriesItemsUpperComponent } from './components/user-accessories-items-upper/user-accessories-items-upper.component';
import { UserAccessoriesLowerComponent } from './components/user-accessories-lower/user-accessories-lower.component';
import { UserAccessoriesItemsLowerComponent } from './components/user-accessories-items-lower/user-accessories-items-lower.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { UserMeasurementsComponent } from './components/profile/user-measurements/user-measurements.component';
import { UserOrdersComponent } from './components/profile/user-orders/user-orders.component';
import { UserOrderDetailsComponent } from './components/profile/user-order-details/user-order-details.component';
import { OrdersComponent } from './tailor/orders/orders.component';
import { OrderDetailsComponent } from './tailor/order-details/order-details.component';
import { AdminAuthGuard } from './guards/auth.admin-guard';
import { TailorAuthGuard } from './guards/auth.tailor-guard';





OrderDashComponent
const routes: Routes =[
  {path: '', component: LoginComponent },
  {path: 'dashboard', component: OrderDashComponent, canActivate:[AuthGuard] },
  {path: 'register', component: RegisterComponent },
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] },  
  {path: 'edit-details', component: AddUserDetailsComponent, canActivate:[AuthGuard] },
  {path: 'edit-measurements', component: UserMeasurementsComponent, canActivate:[AuthGuard]},
  {path: 'my-orders', component: UserOrdersComponent, canActivate:[AuthGuard]},
  {path: 'my-orders/my-orders-details/:id', component: UserOrderDetailsComponent, canActivate:[AuthGuard]},
  {path: 'user-accessories-upper', component: UserAccessoriesComponent, canActivate:[AuthGuard]},
  {path: 'user-accessories-item-upper', component: UserAccessoriesItemsUpperComponent , canActivate:[AuthGuard]},
  {path: 'user-accessories-lower', component: UserAccessoriesLowerComponent, canActivate:[AuthGuard]},
  {path: 'user-accessories-item-lower', component: UserAccessoriesItemsLowerComponent, canActivate:[AuthGuard]},
  {path: 'checkout', component: CheckoutComponent, canActivate:[AuthGuard] },
  
  {path: 'tailor/orders', component: OrdersComponent, canActivate:[TailorAuthGuard, AdminAuthGuard]  },
  {path: 'tailor/orders/:id', component: OrderDetailsComponent , canActivate:[TailorAuthGuard] },
 
  {path: 'admin/add', component: AdminAddProductComponent, canActivate:[AdminAuthGuard]},
  {path: 'admin/dash', component: AdminDashComponent, canActivate:[AdminAuthGuard] },
  {path: 'shopping-cart', component: ShoppingCartComponent, canActivate:[AuthGuard] },
  
  {path: 'admin/details/:id', component: AdminDetailsProductComponent, canActivate:[AdminAuthGuard]},
  {path: 'admin/edit/:id', component: AdminEditProductComponent, canActivate:[AdminAuthGuard]},
  {path: 'admin/products', component: AdminProductsComponent, canActivate:[AdminAuthGuard]},
  {path: 'admin/sidebar', component: SidebarComponent, canActivate:[AdminAuthGuard]},
  {path: 'admin/addaccessories', component: AdminAddAccessoriesComponent, canActivate:[AdminAuthGuard] },
  {path: 'admin/detailsaccessories/:id', component: AdminDetailsAccessoriesComponent, canActivate:[AdminAuthGuard]},
  {path: 'admin/editaccessories/:id', component: AdminEditAccessoriesComponent, canActivate:[AdminAuthGuard]},
  {path: 'admin/accessories', component: AdminAccessoriesComponent, canActivate:[AdminAuthGuard]},
  {path: 'admin/clients', component: AdminClientsComponent, canActivate:[AdminAuthGuard]},
  {path: 'admin/detailsclients/:id', component: AdminDetailsClientComponent, canActivate:[AdminAuthGuard]},
  {path: 'admin/clientpermissions/:id', component: AdminPermissionsClientComponent, canActivate:[AdminAuthGuard]},
  {path: '**', component: NotFoundComponent },



  
  
];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard,
    AdminAuthGuard, 
    TailorAuthGuard
  ]
})
export class AppRoutingModule { }
