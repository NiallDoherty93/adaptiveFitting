import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';
import { Accessories } from 'src/app/models/accessories';
import { Order } from 'src/app/models/order';
import { ProductItems } from 'src/app/models/product-items';
import { UserDetails } from 'src/app/models/user-details';
import { UserMeasurements } from 'src/app/models/user-measurements';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  id: string;
  products: ProductItems[] | any = [];
  accessories: Accessories[] | any = [];
  order: Order;
  user: UserDetails;
  userMeasurements: UserMeasurements;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private orderService: OrdersService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // setting this.id to document id held in the url
    this.id = this.route.snapshot.params['id'];
    // getting the order by this document ID
    this.orderService.getOrder(this.id).subscribe((order) => {
      // if the order exists
      if (order) {
        this.order = order;
        // filters the order by garments (items) and fittings (accessories)
        this.products = order.items.filter((item) => item.product);
        this.accessories = order.items.filter((item) => item.accessory);
      }
    });
    // getting all orders
    this.orderService.getOrders().subscribe((order) => {
      if (order) {
        //looping through the orders
        order.forEach((order) => {
          // if the order.id matches the id held in the document
          if (order.id === this.order.id) {
            // get the user details for that order - uid of customer held in order
            this.userService
              .getUserDetailsByUid(order.uid)
              .subscribe((userDetails) => {
                // if the user exists
                if (userDetails) {
                  // setting this.user to the first point in the array as user details returned as an array
                  this.user = userDetails[0];
                }
              });
            // get the user measurements for that order - uid of customer held in order
            this.userService
              .getUserMeasurementsByUid(order.uid)
              .subscribe((userMeasurements) => {
                // if the user measurments exists
                if (userMeasurements) {
                  // setting this.userMeasurements to the first point in the array as user measurements returned as an array
                  this.userMeasurements = userMeasurements[0];
                }
              });
          }
        });
      }
    });
  }
  // calling delete order
  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.orderService.deleteOrder(this.order);
      this.flashMessage.show('Order Removed', {
        cssClass: 'alert-success',
        timeout: FLASH_MESSAGE_TIMEOUT,
      });
      this.router.navigate(['/tailor/orders']);
    }
  }
}
