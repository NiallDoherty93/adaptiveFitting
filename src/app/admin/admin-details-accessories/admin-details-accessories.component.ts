import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AccessoriesUpper } from 'src/app/models/accessories-upper';
import { AccessoriesItemsUpper } from 'src/app/models/accessorries-items-upper';
import { AccessoriesLower } from 'src/app/models/accessories-lower';
import { AccessoriesItemsLower } from 'src/app/models/accessories-items-lower';
import { Accessories } from 'src/app/models/accessories';
import { ACCESSORY_ITEM_LOWER, ACCESSORY_ITEM_UPPER, ACCESSORY_LOWER, ACCESSORY_UPPER, FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';


@Component({
  selector: 'app-admin-details-accessories',
  templateUrl: './admin-details-accessories.component.html',
  styleUrls: ['./admin-details-accessories.component.css']
})
export class AdminDetailsAccessoriesComponent implements OnInit {
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

  onDeleteClick(){
    if(confirm('Are you sure?')){
      switch(this.accessoryUpper?.type || this.accessoryItemUpper?.type || this.accessoryLower?.type || this.accessoryItemLower?.type){
        case ACCESSORY_UPPER:{
          this.itemService.deleteAccessoriesUpper(this.accessoryUpper)
          this.flashMessage.show('Accessory Removed',{
            cssClass: 'alert-success', timeout: FLASH_MESSAGE_TIMEOUT
          });
          this.router.navigate(['/admin/accessories']);
          break;
        }
        case ACCESSORY_ITEM_UPPER:{
          this.itemService.deleteAccessoriesItemsUpper(this.accessoryItemUpper)
          this.flashMessage.show('Accessory Removed',{
            cssClass: 'alert-success', timeout: FLASH_MESSAGE_TIMEOUT
          });
          this.router.navigate(['/admin/accessories']);
          break;
        }
        case ACCESSORY_LOWER:{
          this.itemService.deleteAccessoriesLower(this.accessoryLower)
          this.flashMessage.show('Accessory Removed',{
            cssClass: 'alert-success', timeout: FLASH_MESSAGE_TIMEOUT
          });
          this.router.navigate(['/admin/accessories']);
          break;
        }
        case ACCESSORY_ITEM_LOWER: {
          this.itemService.deleteAccessoriesItemsLower(this.accessoryItemLower)
          this.flashMessage.show('Accessory Removed',{
            cssClass: 'alert-success', timeout: FLASH_MESSAGE_TIMEOUT
          });
          this.router.navigate(['/admin/accessories']);
          break;
        }
      }

     
    }
  }


}
