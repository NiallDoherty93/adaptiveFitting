import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ProductItems } from 'src/app/models/product-items';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Observable } from 'rxjs';
import { Accessories } from 'src/app/models/accessories';


@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {
  public items: ProductItems[] = [];
  public productName: ProductItems | any;
  public cartId: string | any;
  public cart: ShoppingCart|any;
  cart$!: Observable<ShoppingCart>;
 

  constructor(private itemsService: ItemsService, 
    private flashMessageService: FlashMessagesService,
    private userService: UserService,
    private router: Router,
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService)
   { }

  async ngOnInit(): Promise<void> {
    this.itemsService.getItems().subscribe(items => {
      this.items = items;
    });

  }


  // onSubmit({value, valid}: NgForm){
  //     this.router.navigate(['/user-accessories']);
  //   }

 
    addItemToCart(product: ProductItems){
      switch(product.category){
       
        case "Upper-Body":{
          this.shoppingCartService.addItemToCart(product);
          this.router.navigate(['/user-accessories-upper']);
          break;
        }
        case "Lower-Body":{
          this.shoppingCartService.addItemToCart(product);
          this.router.navigate(['/']);
          break;
        }
       
        
      }
      
    }

 
}

 


