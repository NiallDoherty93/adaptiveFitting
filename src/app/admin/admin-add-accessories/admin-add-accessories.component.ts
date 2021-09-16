import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { ItemsService } from 'src/app/services/items.service';
import { Router } from '@angular/router';
import { ProductItems } from 'src/app/models/product-items';
import { filter } from 'rxjs/operators';
import { AccessoriesUpper } from 'src/app/models/accessories-upper';
import { ACCESSORY_ITEM_LOWER, ACCESSORY_ITEM_UPPER, ACCESSORY_LOWER, ACCESSORY_UPPER, FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';
import { Accessories } from 'src/app/models/accessories';

@Component({
  selector: 'app-admin-add-accessories',
  templateUrl: './admin-add-accessories.component.html',
  styleUrls: ['./admin-add-accessories.component.css']
})
export class AdminAddAccessoriesComponent implements OnInit {

  accessoryUpper!: Accessories;
  accessoryItemUpper!: Accessories;
  accessoryLower!: Accessories;
  accessoryItemLower!: Accessories

  accessory: Accessories = {
    type: '',
    item: '',
    description: '' ,
    image: '', 
    category:'',
  }

  constructor(
    private flashMessagesService: FlashMessagesService,
    private itemService: ItemsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit({value, valid}: NgForm, accessories: Accessories){
    
    if (!valid){
      //show error
      this.flashMessagesService.show('Please fill out the form correctly',{
        cssClass: 'alert-danger', timeout: FLASH_MESSAGE_TIMEOUT
      });
    }else{

      switch(accessories.type){
       
        case ACCESSORY_UPPER:{
          this.itemService.createAccessoriesUpper(value)
          this.router.navigate(['/admin/dash']);
          break;
        }
        case ACCESSORY_ITEM_UPPER:{
          this.itemService.createAccessoriesItemsUpper(value)
          this.router.navigate(['/admin/dash']);
          break;
        }
        case ACCESSORY_LOWER:{
          this.itemService.createAccessoriesLower(value)
          this.router.navigate(['/admin/dash']);
          break;
        }
        case ACCESSORY_ITEM_LOWER: {
          this.itemService.createAccessoriesItemsLower(value)
          this.router.navigate(['/admin/dash']);
          break;
        }
       
        
      }
   

}

  }
}
