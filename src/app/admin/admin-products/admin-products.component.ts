import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ProductItems } from 'src/app/models/product-items';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'
],   template: `
<div>
  <ngx-datatable [rows]="rows" [columns]="columns"> </ngx-datatable>
</div>
`
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: ProductItems[]=[];
  // product: ProductItems |any;
  subscription: Subscription|any;
  filteredProducts: ProductItems[]=[]

  

  constructor(private itemService: ItemsService) {
    this.subscription= this.itemService.getItems().subscribe(products=> this.filteredProducts= this.products = products)
   }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(products => {
      this.products = products
      console.log(this.products);
     
    });
     
  }
//client side searching - quicker if under around 500 values
  filter(query: string){
    this.filteredProducts=(query)?
    this.products.filter(p => p.item?.toLowerCase().includes(query.toLowerCase())) :
    this.products;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

 

}


