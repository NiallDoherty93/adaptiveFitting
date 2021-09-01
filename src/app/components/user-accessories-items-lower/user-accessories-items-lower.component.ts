import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ProductItems } from 'src/app/models/product-items';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AccessoriesItemsLower } from 'src/app/models/accessories-items-lower';
import { Accessories } from 'src/app/models/accessories';

@Component({
  selector: 'app-user-accessories-items-lower',
  templateUrl: './user-accessories-items-lower.component.html',
  styleUrls: ['./user-accessories-items-lower.component.css']
})
export class UserAccessoriesItemsLowerComponent implements OnInit {
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
    this.itemsService.getAccessoriesItemsLower().subscribe(accessories => {
      this.accessories = accessories;
    });
  }

  onSubmit({value, valid}: NgForm){
  
      
    this.router.navigate(['checkout']);
    
    
  }

  addAccessoryItemsLowerToCart(accessory: Accessories){
    
    this.shoppingCartService.addAccessoryItemsLowerToCart(accessory);
  
  }

}
