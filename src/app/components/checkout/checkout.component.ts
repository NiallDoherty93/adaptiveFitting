import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Observable, Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
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
  cart: any;

  userSubscription: Subscription;
  userId: string;
  cartSubscription: Subscription;

  cart$: Observable<any>;
  userDetails: UserDetails;
  userMeasurements: UserMeasurements;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrdersService,
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private flashMessagesService: FlashMessagesService
  ) {}

  async ngOnInit(): Promise<void> {
    // calling the cart items and subscribing to the cart as an observable
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$
      .pipe()
      .subscribe((cart) => (this.cart = cart));

    // getting cart items to display to the shopping cart on the checkout screen
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart = this.shoppingCartService
      .getCart()
      .then((result) => (this.cart = result));

    // if the user is logged in, subscribe to the value of thier uid
    this.auth.getAuth().subscribe((userAuth) => {
      this.userId = userAuth?.uid[0];

      // if the users UID exists (which it will becasuse this component cannot be accessed if uuser not registered and logged in)
      if (this.userId) {
        // get the users details and subscribe to as observable
        this.userService.getUserDetails().subscribe((user) => {
          // uuser details returned as an array so this.userDetails is equal to first array
          this.userDetails = user[0];
        });
      }
    });
    // if the user is logged in, subscribe to the value of their uid
    this.auth.getAuth().subscribe((userAuth) => {
      this.userId = userAuth?.uid[0];
      // if the users UID exists (which it will becasuse this component cannot be accessed if uuser not registered and logged in)
      if (this.userId) {
        // get the users body measurements and subscribe to as observable
        this.userService.getUserMeasurements().subscribe((measurement) => {
          // uuser details returned as an array so this.userMeasurements is equal to first array
          this.userMeasurements = measurement[0];
        });
      }
    });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  placeOrder() {
    // checking to see if user filled out thier details before trying to place an order
    if (
      !this.isUserDetailsEmpty(this.userDetails) ||
      !this.isUserMeasurementsEmpty(this.userMeasurements)
    ) {
      // order is populated with the cart items and a date-time stamp
      let order = {
        items: this.cart.items,
        datePlaced: new Date().getTime(),
      };
      // calling the place order method from the orderService and setting "order" (lines 90-93) as the parameter
      this.orderService.placeOrder(order);
      // navigate back to dash
      this.router.navigate(['/']);
      // success message
      this.flashMessagesService.show('Order Placed Successfully!', {
        cssClass: 'alert-success',
        timeout: FLASH_MESSAGE_TIMEOUT,
      });
    } else {
      //  if no user details or body measurements inputted, error message shown telling user to fill out their
      this.flashMessagesService.show(
        'Please ensure your details are fully filled out before you place your order',
        {
          cssClass: 'alert-danger',
          timeout: FLASH_MESSAGE_TIMEOUT,
        }
      );
    }
  }

  // checking to see of the user details are empty
  isUserDetailsEmpty(userDetails: UserDetails): boolean {
    if (
      userDetails.address === null ||
      userDetails.address === '' ||
      userDetails.address === undefined
    ) {
      return true;
    } else {
      return false;
    }
  }
  //checking to see if user body mesaurements are empty
  isUserMeasurementsEmpty(userMeasurements: UserMeasurements): boolean {
    if (
      userMeasurements.chest === null ||
      userMeasurements.chest === undefined ||
      userMeasurements.chest.toString() === ''
    ) {
      return true;
    } else {
      return false;
    }
  }
}
