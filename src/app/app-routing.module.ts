import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

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
import { AdminSettingsComponent } from './admin/admin-settings/admin-settings.component';
import { AdminAddProductComponent } from './admin/admin-add-product/admin-add-product.component';
import { AdminAddAccessoriesComponent } from './admin/admin-add-accessories/admin-add-accessories.component';
import { AdminDetailsAccessoriesComponent } from './admin/admin-details-accessories/admin-details-accessories.component';
import { AdminEditAccessoriesComponent } from './admin/admin-edit-accessories/admin-edit-accessories.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';


import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

import { UserAccessoriesComponent } from './components/user-accessories-upper/user-accessories.component';
import { UserAccessoriesItemsUpperComponent } from './components/user-accessories-items-upper/user-accessories-items-upper.component';

import { UserAccessoriesLowerComponent } from './components/user-accessories-lower/user-accessories-lower.component';
import { UserAccessoriesItemsLowerComponent } from './components/user-accessories-items-lower/user-accessories-items-lower.component';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { UserMeasurementsComponent } from './components/profile/user-measurements/user-measurements.component';
import { UserOrdersComponent } from './components/profile/user-orders/user-orders.component';





const routes: Routes =[
  {path: '', component: OrderDashComponent },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'profile', component: ProfileComponent },  
  {path: 'edit-details', component: AddUserDetailsComponent },
  {path: 'edit-measurements', component: UserMeasurementsComponent},
  {path: 'my-orders', component: UserOrdersComponent},

  {path: 'user-accessories-upper', component: UserAccessoriesComponent},
  {path: 'user-accessories-item-upper', component: UserAccessoriesItemsUpperComponent},
  {path: 'user-accessories-lower', component: UserAccessoriesLowerComponent},
  {path: 'user-accessories-item-lower', component: UserAccessoriesItemsLowerComponent},

  {path: 'checkout', component: CheckoutComponent },
  
  {path: 'admin/add', component: AdminAddProductComponent},
  {path: 'admin/dash', component: AdminDashComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent },
  {path: 'admin/details/:id', component: AdminDetailsProductComponent},
  {path: 'admin/edit/:id', component: AdminEditProductComponent},
  {path: 'admin/products', component: AdminProductsComponent},
  {path: 'admin/settings', component: AdminSettingsComponent},
  {path: 'admin/sidebar', component: SidebarComponent},
  {path: 'admin/addaccessories', component: AdminAddAccessoriesComponent },
  {path: 'admin/detailsaccessories/:id', component: AdminDetailsAccessoriesComponent},
  {path: 'admin/editaccessories/:id', component: AdminEditAccessoriesComponent},
  {path: 'admin/accessories', component: AdminAddAccessoriesComponent},
  {path: '**', component: NotFoundComponent },

  
  
];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
