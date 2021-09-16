import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  userId: string | any;
  order: Order | any;
  orders: Order[]=[];

  constructor(
    private flashMessageService: FlashMessagesService,
    private userService: UserService,
    private orderService: OrdersService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.getAuth().subscribe(userAuth => {
      this.userId = userAuth?.uid[0]
      // console.log(this.userId)
      if(this.userId){
        this.orderService.getUserOrder().subscribe(order =>{
          this.orders = order
         
          console.log(order)
        })
      } 
    }) ;
  }
}
