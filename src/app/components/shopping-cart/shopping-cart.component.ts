import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(
    public shoppingCartService: ShoppingCartService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    // getting users shopping cart and subsribing to the returned observeable - no uid required as cart id stored in local storage acts as identifier
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.pipe().subscribe((cart) => {});
  }

  clearCart() {
    // calling the clear cart method in the shoppingCartService to allow user to clear all items from cart
    this.shoppingCartService.clearCart();
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    this.router.navigate(['/checkout']);
  }
}
