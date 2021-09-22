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
    this.itemsService.getItems().subscribe((items) => {
      this.items = items;
    });
  }

  addToCart(product: ProductItems) {
    switch (product.category) {
      case 'Upper-Body': {
        this.shoppingCartService.addItemToCart(product);
        this.router.navigate(['/user-accessories-upper']);
        break;
      }
      case 'Lower-Body': {
        this.shoppingCartService.addItemToCart(product);
        this.router.navigate(['/user-accessories-lower']);
        break;
      }
    }
  }
}
