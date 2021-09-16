import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ProductItems } from 'src/app/models/product-items';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AccessoriesUpper } from 'src/app/models/accessories-upper';
import { Accessories } from 'src/app/models/accessories';

@Component({
  selector: 'app-user-accessories',
  templateUrl: './user-accessories.component.html',
  styleUrls: ['./user-accessories.component.css']
})
export class UserAccessoriesComponent implements OnInit {
  public accessories: Accessories[] = [];
  public accessoryName: Accessories | any;
  accessoriesCollection: any;

  constructor(
    private itemsService: ItemsService, 
    private flashMessageService: FlashMessagesService,
    private userService: UserService,
    private router: Router,
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.itemsService.getAccessoriesUpper().subscribe(accessories => {
      this.accessories = accessories;
    });
  }

  onSubmit({value, valid}: NgForm){
  
      
    this.router.navigate(['/user-accessories-upper']);
    
    
  }

  addAccessoryUpperToCart(accessory: Accessories){
    
    this.shoppingCartService.addAccessoryUpperToCart(accessory);
  
  }

}
