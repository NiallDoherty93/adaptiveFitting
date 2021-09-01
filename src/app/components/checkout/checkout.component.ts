import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Observable, Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { ShoppingCartItem } from 'src/app/models/ShoppingCartItem';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cart!: any;
  items: ShoppingCartItem[]| any;
  userSubscription!: Subscription
  userId!: string | any;
  cartSubscription!: Subscription;
  
  cart$!: Observable<any>;

  constructor(private shoppingCartService: ShoppingCartService,
    private orderService: OrdersService,
    private authService: AuthService,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    let cart$ = await this.shoppingCartService.getCart()
    this.cartSubscription= cart$.pipe().subscribe(cart => this.cart = cart);
    
    

    this.cart$ = await this.shoppingCartService.getCart();
    this.cart = this.shoppingCartService.getCart().then(result => this.cart = result);
   
   
  }

  ngOnDestroy(){
      this.cartSubscription.unsubscribe();
  }

   placeOrder() {
    let order = {
      items: this.cart.items,
      datePlaced: new Date().getTime(),
      
      
    }
    this.orderService.placeOrder(order)
    this.router.navigate(['/']);
    
  }

 

}
