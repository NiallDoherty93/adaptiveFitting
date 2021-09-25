import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ProductItems } from 'src/app/models/product-items';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  template: `
    <div>
      <ngx-datatable [rows]="rows" [columns]="columns"> </ngx-datatable>
    </div>
  `,
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: ProductItems[] = [];
  subscription: Subscription | any;
  filteredProducts: ProductItems[] = [];

  constructor(private itemService: ItemsService) {
    // getting all products (garments) held in the server by calling getItems from the item service
    // Assigning products to value of filteredProducts
    this.subscription = this.itemService
      .getItems()
      .subscribe(
        (products) => (this.filteredProducts = this.products = products)
      );
  }

  ngOnInit(): void {
    this.itemService.getItems().subscribe((products) => {
      this.products = products;
    });
  }
  //client side searching - quicker if under around 500 values
  filter(query: string) {
    // query is the users input in the HTML form
    this.filteredProducts = query
      ? // setting input to lower case - search allows search by item title
        this.products.filter((p) =>
          p.item?.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  // unsubscribing from obserable in constructor to avoid memory leaks
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
