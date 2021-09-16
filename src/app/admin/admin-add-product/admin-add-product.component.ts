import { Component, OnInit , ViewChild} from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { ItemsService } from 'src/app/services/items.service';
import { Router } from '@angular/router';
import { ProductItems } from 'src/app/models/product-items';
import { filter } from 'rxjs/operators';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';


@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {
  product: ProductItems = {
    item: '',
    description: '',
    image: '',
    category: '',
  }

  @ViewChild('productForm') form: any
  
  
  constructor(
    private flashMessagesService: FlashMessagesService,
    private itemService: ItemsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  onSubmit({value, valid}: NgForm){
   
    if (!valid){
      //show error
      this.flashMessagesService.show('Please fill out the form correctly',{
        cssClass: 'alert-danger', timeout: FLASH_MESSAGE_TIMEOUT
      });
    }else{
      // add new item
      this.itemService.createItem(value)
      //show message
      this.flashMessagesService.show('New item added!',{
        cssClass: 'alert-success', timeout: FLASH_MESSAGE_TIMEOUT
      
      
    });
      // redirect to dash
      this.router.navigate(['/admin/dash']);

}

  }


  
}
