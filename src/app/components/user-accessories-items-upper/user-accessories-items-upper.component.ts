import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Accessories } from 'src/app/models/accessories';

@Component({
  selector: 'app-user-accessories-items-upper',
  templateUrl: './user-accessories-items-upper.component.html',
  styleUrls: ['./user-accessories-items-upper.component.css'],
})
export class UserAccessoriesItemsUpperComponent implements OnInit {
  public accessories: Accessories[] = [];
  public accessoryName: Accessories | any;
  // accessoriesCollection: any;

  constructor(
    private itemsService: ItemsService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    // getting all upper body secondary fittings from the server
    this.itemsService.getAccessoriesItemsUpper().subscribe((accessories) => {
      this.accessories = accessories;
    });
  }

  onSubmit({ value, valid }: NgForm) {
    this.router.navigate(['/user-accessories-item-upper']);
  }
  addAccessoryItemUpperToCart(accessory: Accessories) {
    // add selected fittings to the cart
    this.shoppingCartService.addAccessoryItemUpperToCart(accessory);
  }
}
