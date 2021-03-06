import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { ProductItems } from 'src/app/models/product-items';
import { NgForm } from '@angular/forms';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.css']
})
export class AdminEditProductComponent implements OnInit {
  id: string |any;
  product: ProductItems|any;

  constructor(
    private itemService: ItemsService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessageService: FlashMessagesService
  ) { }

  ngOnInit(): void {
    
    // get document id from url
    this.id = this.route.snapshot.params['id'];
    // get products by document id
    this.itemService.getItem(this.id).subscribe(product => 
      this.product = product);
  }

  onSubmit({value, valid}: NgForm){
    if(!valid){
      // danger message if form sumission invalid
      this.flashMessageService.show('Please fill out the form correctly',{
          cssClass: 'alert-danger', timeout: FLASH_MESSAGE_TIMEOUT
      });
    }else{
      // add id to client
      value.id= this.id;
      //update client calling updateItem (value) - value is equal to the document id
      this.itemService.updateItem(value);
      this.flashMessageService.show('Client updated',{
        cssClass: 'alert-success', timeout: FLASH_MESSAGE_TIMEOUT
    
    });
    // nagivate using route to specific user details via the doc id
    this.router.navigate(['/admin/details/'+this.id])
}

}

}
