import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Accessories } from 'src/app/models/accessories';

@Component({
  selector: 'app-user-accessories',
  templateUrl: './user-accessories.component.html',
  styleUrls: ['./user-accessories.component.css']
})
export class UserAccessoriesComponent implements OnInit {
  public accessories: Accessories[] = [];
  public accessoryName: Accessories | any;
  // accessoriesCollection: any;

  constructor(
    private itemsService: ItemsService, 
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    // getting all upper body secondary primary from the server
    this.itemsService.getAccessoriesUpper().subscribe(accessories => {
      this.accessories = accessories;
    });
  }

  onSubmit({value, valid}: NgForm){ 
    this.router.navigate(['/user-accessories-upper']);
  }

  addAccessoryUpperToCart(accessory: Accessories){
        // add selected fittings to the cart
    this.shoppingCartService.addAccessoryUpperToCart(accessory);
  }

}
