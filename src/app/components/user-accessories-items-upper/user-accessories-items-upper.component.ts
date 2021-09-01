import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ProductItems } from 'src/app/models/product-items';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AccessoriesItemsUpper } from 'src/app/models/accessorries-items-upper';
import { Accessories } from 'src/app/models/accessories';

@Component({
  selector: 'app-user-accessories-items-upper',
  templateUrl: './user-accessories-items-upper.component.html',
  styleUrls: ['./user-accessories-items-upper.component.css']
})
export class UserAccessoriesItemsUpperComponent implements OnInit {
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
    this.itemsService.getAccessoriesItemsUpper().subscribe(accessories => {
      this.accessories = accessories;
    });
  }

  onSubmit({value, valid}: NgForm){
  
      
    this.router.navigate(['/user-accessories']);
    
    
  }

  addAccessoryItemUpperToCart(accessory: Accessories){
    
    this.shoppingCartService.addAccessoryItemUpperToCart(accessory);
  
  }

}
