import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
  ,   template:`
  <div>
    <ngx-datatable [rows]="rows" [columns]="columns"> </ngx-datatable>
  </div>
  `
})





export class OrdersComponent implements OnInit, OnDestroy {
  orders: Order[]=[];
  subscription: Subscription|any;
  filteredOrders: Order[]=[]
  

  constructor(private orderService: OrdersService,
              private userService: UserService) {
    this.subscription = this.orderService.getOrders().subscribe(order=> this.filteredOrders= this.orders = order)
   }

  ngOnInit(): void {

    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders
      
     
    });
    // this.orderService.getOrders().subscribe(order => {
    //   if (order) {
    //     this.orders = order
    //     order.forEach(order => {
    //       this.userService.getUserDetailsByUid(order.uid).subscribe(userDetails => {
    //         console.log(userDetails);
    //       });
    //     });
    //   }
    // });

    // this.orderService.getOrders().subscribe(order => {
    //   if (order) {
    //     this.orders = order
    //     order.forEach(order => {
    //       this.userService.getUserMeasurementsByUid(order.uid).subscribe(userMeasurements => {
    //         console.log(userMeasurements);
    //       });
    //     });
    //   }
    // });
  }

  filter(query: string){
    this.filteredOrders=(query)?
    this.orders.filter(o => o.id?.toLowerCase().includes(query.toLowerCase())) :
    this.orders;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
