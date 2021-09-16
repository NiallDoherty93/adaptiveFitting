import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Accessories } from 'src/app/models/accessories';
import { Order } from 'src/app/models/order';
import { orderItem } from 'src/app/models/order-item';
import { ProductItems } from 'src/app/models/product-items';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-user-order-details',
  templateUrl: './user-order-details.component.html',
  styleUrls: ['./user-order-details.component.css']
})
export class UserOrderDetailsComponent implements OnInit {
  id: string |any;
  products: ProductItems[] | any = [];
  accessories: Accessories[] | any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.orderService.getOrder(this.id).subscribe(order => {
      if (order) {
        this.products = order.items.filter(item => item.product);
        this.accessories = order.items.filter(item => item.accessory);
      }
    })
  }

}
