import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Accessories } from 'src/app/models/accessories';

@Component({
  selector: 'app-user-accessories-lower',
  templateUrl: './user-accessories-lower.component.html',
  styleUrls: ['./user-accessories-lower.component.css'],
})
export class UserAccessoriesLowerComponent implements OnInit {
  public accessories: Accessories[] = [];
  public accessoryName: Accessories | any;
  // accessoriesCollection: any;

  constructor(
    private itemsService: ItemsService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    // getting all lower body primary fittings from the server
    this.itemsService.getAccessoriesLower().subscribe((accessories) => {
      this.accessories = accessories;
    });
  }

  onSubmit({ value, valid }: NgForm) {
    this.router.navigate(['/user-accessories-lower']);
  }

  addAccessoryLowerToCart(accessory: Accessories) {
    // add selected fittings to the cart
    this.shoppingCartService.addAccessoryLowerToCart(accessory);
  }
}
