import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  userId: string;
  order: Order;
  orders: Order[] = [];

  constructor(private orderService: OrdersService, private auth: AuthService) {}

  ngOnInit(): void {
    // checking auth status of user to see if they are logged in
    this.auth.getAuth().subscribe((userAuth) => {
      // if user exists, set userId to the returned users uid in the array
      this.userId = userAuth?.uid[0];
      // if the userId exists (it always will)
      if (this.userId) {
        //get all the orders of that user
        this.orderService.getUserOrder().subscribe((order) => {
          this.orders = order;
        });
      }
    });
  }
}
