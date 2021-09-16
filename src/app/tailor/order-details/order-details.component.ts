import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
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
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  id: string |any;
  products: ProductItems[] | any = [];
  accessories: Accessories[] | any = [];
  order: Order | any;
  user: UserDetails | any;
  userMeasurements: UserMeasurements| any;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private orderService: OrdersService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.orderService.getOrder(this.id).subscribe(order => {
      if (order) {
        this.order = order
        this.products = order.items.filter(item => item.product);
        this.accessories = order.items.filter(item => item.accessory);
      }
    });
    
    this.orderService.getOrders().subscribe(order => {
      if (order) {
        order.forEach(order => {
          if (order.id === this.order.id) {
            this.userService.getUserDetailsByUid(order.uid).subscribe(userDetails => {
              if (userDetails) {
                this.user = userDetails[0];
              }
            });

            this.userService.getUserMeasurementsByUid(order.uid).subscribe(userMeasurements => {
              if (userMeasurements) {
                this.userMeasurements = userMeasurements[0];
              }
            });
          }
        });
      }
    });
  }
}
