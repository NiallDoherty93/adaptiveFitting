import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Accessories } from 'src/app/models/accessories';

@Component({
  selector: 'app-user-accessories-items-lower',
  templateUrl: './user-accessories-items-lower.component.html',
  styleUrls: ['./user-accessories-items-lower.component.css'],
})
export class UserAccessoriesItemsLowerComponent implements OnInit {
  public accessories: Accessories[] = [];
  public accessoryName: Accessories;
  accessoriesCollection: any;

  constructor(
    private itemsService: ItemsService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    // getting all lower body secondary fittings from the server
    this.itemsService.getAccessoriesItemsLower().subscribe((accessories) => {
      this.accessories = accessories;
    });
  }

  onSubmit({ value, valid }: NgForm) {
    this.router.navigate(['/user-accessories-item-lower']);
  }

  addAccessoryItemsLowerToCart(accessory: Accessories) {
    // add selected fittings to the cart
    this.shoppingCartService.addAccessoryItemsLowerToCart(accessory);
  }
}
