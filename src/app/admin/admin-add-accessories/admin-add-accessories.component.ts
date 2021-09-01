import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { ItemsService } from 'src/app/services/items.service';
import { Router } from '@angular/router';
import { ProductItems } from 'src/app/models/product-items';
import { filter } from 'rxjs/operators';
import { AccessoriesUpper } from 'src/app/models/accessories-upper';

@Component({
  selector: 'app-admin-add-accessories',
  templateUrl: './admin-add-accessories.component.html',
  styleUrls: ['./admin-add-accessories.component.css']
})
export class AdminAddAccessoriesComponent implements OnInit {

  accessory: AccessoriesUpper = {
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

  onSubmit({value, valid}: NgForm, accessories: AccessoriesUpper){
    
    if (!valid){
      //show error
      this.flashMessagesService.show('Please fill out the form correctly',{
        cssClass: 'alert-danger', timeout: 4000
      });
    }else{

      switch(accessories.category){
       
        case "Upper-Body":{
          this.itemService.createAccessoriesUpper(value)
          this.router.navigate(['/admin/dash']);
          break;
        }
        case "Upper-Body-Item":{
          this.itemService.createAccessoriesItemsUpper(value)
          this.router.navigate(['/admin/dash']);
          break;
        }
        case "Lower-Body":{
          this.itemService.createAccessoriesLower(value)
          this.router.navigate(['/admin/dash']);
          break;
        }
        case "Lower-Body-Item": {
          this.itemService.createAccessoriesItemsLower(value)
          this.router.navigate(['/admin/dash']);
          break;
        }
       
        
      }
   

}

  }
}
