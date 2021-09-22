import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Observable, Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { ShoppingCartItem } from 'src/app/models/ShoppingCartItem';
import { UserDetails } from 'src/app/models/user-details';
import { UserService } from 'src/app/services/user.service';
import { UserMeasurements } from 'src/app/models/user-measurements';
import { FlashMessagesService } from 'flash-messages-angular';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cart!: any;
  items: ShoppingCartItem[] | any;
  userSubscription!: Subscription;
  userId!: string | any;
  cartSubscription!: Subscription;

  cart$!: Observable<any>;
  userDetails: UserDetails;
  userMeasurements: UserMeasurements;

  // userDetails: UserDetails = {
  //   uid: '',
  //   address: '',
  //   email: '',
  //   firstName: '',
  //   lastName: '',
  //   phone: '',
  //   postcode: ''
  // }

  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrdersService,
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private flashMessagesService: FlashMessagesService
  ) {}

  async ngOnInit(): Promise<void> {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$
      .pipe()
      .subscribe((cart) => (this.cart = cart));

    this.cart$ = await this.shoppingCartService.getCart();
    this.cart = this.shoppingCartService
      .getCart()
      .then((result) => (this.cart = result));

    this.auth.getAuth().subscribe((userAuth) => {
      this.userId = userAuth?.uid[0];
      // console.log(this.userId)
      if (this.userId) {
        this.userService.getUserDetails().subscribe((user) => {
          this.userDetails = user[0];

          
        });
      }
    });

    this.auth.getAuth().subscribe((userAuth) => {
      this.userId = userAuth?.uid[0];
      // console.log(this.userId)
      if (this.userId) {
        this.userService.getUserMeasurements().subscribe((measurement) => {
          this.userMeasurements = measurement[0];

          console.log(measurement);
        });
      }
    });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  placeOrder() {
    if (!this.isUserDetailsEmpty(this.userDetails) || !this.isUserMeasurementsEmpty(this.userMeasurements)) {
      let order = {
        items: this.cart.items,
        datePlaced: new Date().getTime(),
      };
      this.orderService.placeOrder(order);
      this.router.navigate(['/']);
      this.flashMessagesService.show('Order Placed Successfully!', {
        cssClass: 'alert-success',
        timeout: FLASH_MESSAGE_TIMEOUT,
      });
    } else {
      this.flashMessagesService.show(
        'Please ensure your details are fully filled out',
        {
          cssClass: 'alert-danger',
          timeout: FLASH_MESSAGE_TIMEOUT,
        }
      );
    }
  }

  isUserDetailsEmpty(userDetails: UserDetails): boolean {
    if (userDetails.address === null || userDetails.address === '' || userDetails.address === undefined) {
      return true;
    } else {
      return false;
    }
  }

  isUserMeasurementsEmpty(userMeasurements: UserMeasurements): boolean {
    if (userMeasurements.chest === null || userMeasurements.chest === undefined || userMeasurements.chest.toString() ==='') {
      return true;
    } else {
      return false;
    }
  }
}
