import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { NgForm } from '@angular/forms';
import { Accessories } from 'src/app/models/accessories';
import { ACCESSORY_ITEM_LOWER, ACCESSORY_ITEM_UPPER, ACCESSORY_LOWER, ACCESSORY_UPPER, FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';

@Component({
  selector: 'app-admin-edit-accessories',
  templateUrl: './admin-edit-accessories.component.html',
  styleUrls: ['./admin-edit-accessories.component.css']
})
export class AdminEditAccessoriesComponent implements OnInit {
  // id: string |any;
  idUpper: string |any;
  idUpperItem: string |any;
  idLower: string |any;
  idLowerItem: string |any;
  accessory!: Accessories;
  accessoryUpper!: Accessories;
  accessoryItemUpper!: Accessories;
  accessoryLower!: Accessories;
  accessoryItemLower!: Accessories
  

  constructor(
    private itemService: ItemsService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.idUpper = this.route.snapshot.params['id'];

    this.itemService.getAccessoryUpper(this.idUpper).subscribe(accessoryUpper =>{
      this.accessoryUpper = accessoryUpper
    })

    this.idUpperItem = this.route.snapshot.params['id'];

    this.itemService.getAccessoryItemUpper(this.idUpperItem).subscribe(accessoryItemUpper =>{
      this.accessoryItemUpper = accessoryItemUpper
    })

    this.idLower = this.route.snapshot.params['id'];

    this.itemService.getAccessoryLower(this.idLower).subscribe(accessoryLower =>{
      this.accessoryLower = accessoryLower
    })

    this.idLowerItem = this.route.snapshot.params['id'];

    this.itemService.getAccessoryItemLower(this.idLowerItem).subscribe(accessoryItemLower =>{
      this.accessoryItemLower = accessoryItemLower
    })
  }

  onSubmit({value, valid}: NgForm){
    if(!valid){
      this.flashMessage.show('Please fill out the form correctly',{
          cssClass: 'alert-danger', timeout: FLASH_MESSAGE_TIMEOUT
      });
    }else{
      // add id to client
      value.id= this.idUpper || this.idUpperItem || this.idLower || this.idLowerItem;

      switch(this.accessoryUpper?.type || this.accessoryItemUpper?.type || this.accessoryLower?.type || this.accessoryItemLower?.type){
        case ACCESSORY_UPPER:{
          this.itemService.updateAccessoriesUpper(value)
          this.flashMessage.show('Accessory Updated',{
            cssClass: 'alert-success', timeout: FLASH_MESSAGE_TIMEOUT
          });
          this.router.navigate(['/admin/detailsaccessories/'+this.idUpper])
          break;
        }
        case ACCESSORY_ITEM_UPPER:{
          this.itemService.updateAccessoriesItemsUpper(value)
          this.flashMessage.show('Accessory Updated',{
            cssClass: 'alert-success', timeout: FLASH_MESSAGE_TIMEOUT
          });
          this.router.navigate(['/admin/detailsaccessories/'+this.idUpperItem])
          break;
        }
        case ACCESSORY_LOWER:{
          this.itemService.updateAccessoriesLower(value)
          this.flashMessage.show('Accessory Updated',{
            cssClass: 'alert-success', timeout: FLASH_MESSAGE_TIMEOUT
          });
          this.router.navigate(['/admin/detailsaccessories/'+this.idLower])
          break;
        }
        case ACCESSORY_ITEM_LOWER: {
          this.itemService.updateAccessoriesItemsLower(value)
          this.flashMessage.show('Accessory Updated',{
            cssClass: 'alert-success', timeout: FLASH_MESSAGE_TIMEOUT
          });
          this.router.navigate(['/admin/detailsaccessories/'+this.idLowerItem])
          break;
        }
      }

    
}

}

}
