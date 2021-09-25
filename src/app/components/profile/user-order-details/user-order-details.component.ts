import { Component,OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Accessories } from 'src/app/models/accessories';
import { ProductItems } from 'src/app/models/product-items';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-user-order-details',
  templateUrl: './user-order-details.component.html',
  styleUrls: ['./user-order-details.component.css'],
})
export class UserOrderDetailsComponent implements OnInit {
  id: string;
  products: ProductItems[] | any = [];
  accessories: Accessories[] | any = [];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService
  ) {}

  ngOnInit(): void {
    // getting id of user-details document in the URL
    this.id = this.route.snapshot.params['id'];
    // passing in id to getOrder to get the order by that document id
    this.orderService.getOrder(this.id).subscribe((order) => {
      // if the order exists (it always will)
      if (order) {
        // filter the items by garment
        this.products = order.items.filter((item) => item.product);
        // filter the items by accessory
        this.accessories = order.items.filter((item) => item.accessory);
      }
    });
  }
}
