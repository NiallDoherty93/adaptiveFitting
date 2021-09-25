import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ProductItems } from 'src/app/models/product-items';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css'],
})
export class OrderItemsComponent implements OnInit {
  public items: ProductItems[] = [];
  public productName: ProductItems | any;
  public cartId: string | any;
  public cart: ShoppingCart | any;
  public cart$!: Observable<ShoppingCart>;

  constructor(
    private itemsService: ItemsService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit(): Promise<void> {
    // getting the items (garments) via getItems in the item service
    this.itemsService.getItems().subscribe((items) => {
      this.items = items;
    });
  }
  // depending on what type of garement the user has selected, navigation routes set in place
  addToCart(product: ProductItems) {
    switch (product.category) {
      // if the garment is an upper body item
      case 'Upper-Body': {
        // add the item to the cart
        this.shoppingCartService.addItemToCart(product);
        // navigate to fittings related to upper body garments
        this.router.navigate(['/user-accessories-upper']);
        break;
      }
      // if the garment is an lower body item
      case 'Lower-Body': {
        // add the item to the cart
        this.shoppingCartService.addItemToCart(product);
        // navigate to fittings related to lower body garments
        this.router.navigate(['/user-accessories-lower']);
        break;
      }
    }
  }
}
