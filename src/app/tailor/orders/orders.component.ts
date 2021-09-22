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
    this.subscription = this.orderService
      .getOrders()
      .subscribe((order) => (this.filteredOrders = this.orders = order));
  }

  ngOnInit(): void {}

  filter(query: string) {
    this.filteredOrders = query
      ? this.orders.filter((order) =>
          order.id?.toLowerCase().includes(query.toLowerCase())
        )
      : this.orders;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
