import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { ProductItems } from 'src/app/models/product-items';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';

@Component({
  selector: 'app-admin-details-product',
  templateUrl: './admin-details-product.component.html',
  styleUrls: ['./admin-details-product.component.css']
})
export class AdminDetailsProductComponent implements OnInit {
  id: string |any;
  product: ProductItems |any;

  constructor(
    private itemService: ItemsService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    //get id from url
    this.id = this.route.snapshot.params['id'];
    //get product
    this.itemService.getItem(this.id).subscribe(product=>{
      this.product=product;
      console.log(product)
      
    })
  }

  onDeleteClick(){
    if(confirm('Are you sure?')){
      this.itemService.deleteItem(this.product);
      this.flashMessage.show('Product Removed',{
        cssClass: 'alert-success', timeout: FLASH_MESSAGE_TIMEOUT
      });
      this.router.navigate(['/admin/products']);
    }
  }


}
