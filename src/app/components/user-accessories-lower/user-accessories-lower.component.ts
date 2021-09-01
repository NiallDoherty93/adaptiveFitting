import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ProductItems } from 'src/app/models/product-items';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AccessoriesLower } from 'src/app/models/accessories-lower';
import { Accessories } from 'src/app/models/accessories';

@Component({
  selector: 'app-user-accessories-lower',
  templateUrl: './user-accessories-lower.component.html',
  styleUrls: ['./user-accessories-lower.component.css']
})
export class UserAccessoriesLowerComponent implements OnInit {
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
    
    this.itemsService.getAccessoriesLower().subscribe(accessories => {
      this.accessories = accessories;
      
    });
  }

  
  onSubmit({value, valid}: NgForm){
  
      
    this.router.navigate(['/user-accessories-item-lower']);
    
    
  }

  addAccessoryLowerToCart(accessory: Accessories){
    
    this.shoppingCartService.addAccessoryLowerToCart(accessory);
  
  }

}
