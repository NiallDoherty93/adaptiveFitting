import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  template: `
    <div>
      <ngx-datatable [rows]="rows" [columns]="columns"> </ngx-datatable>
    </div>
  `,
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  subscription: Subscription | any;
  filteredOrders: Order[] = [];

  constructor(private orderService: OrdersService) {
    // setting this.subscription to getOrders()
    this.subscription = this.orderService
      .getOrders()
      // subscribing to the returned values
      // assigning order to this.filteredOrders
      .subscribe((order) => (this.filteredOrders = this.orders = order));
  }

  ngOnInit(): void {}

  // filter method to seach by order ID
  filter(query: string) {
    // setting filtered orders to equal the users input
    this.filteredOrders = query
      ? this.orders.filter((order) =>
          // ignoring case sensitivity
          order.id?.toLowerCase().includes(query.toLowerCase())
        )
      : // returning the appliable order(s)
        this.orders;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
