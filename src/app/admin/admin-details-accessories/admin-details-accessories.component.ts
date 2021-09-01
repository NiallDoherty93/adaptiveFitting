import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AccessoriesUpper } from 'src/app/models/accessories-upper';
import { AccessoriesItemsUpper } from 'src/app/models/accessorries-items-upper';
import { AccessoriesLower } from 'src/app/models/accessories-lower';
import { AccessoriesItemsLower } from 'src/app/models/accessories-items-lower';
import { Accessories } from 'src/app/models/accessories';


@Component({
  selector: 'app-admin-details-accessories',
  templateUrl: './admin-details-accessories.component.html',
  styleUrls: ['./admin-details-accessories.component.css']
})
export class AdminDetailsAccessoriesComponent implements OnInit {
  id: string |any;
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
    this.id = this.route.snapshot.params['id'];

    this.itemService.getAccessoryUpper(this.id).subscribe(accessory =>{
      this.accessoryUpper = accessory
    })

    this.itemService.getAccessoryItemUpper(this.id).subscribe(accessory =>{
      this.accessoryItemUpper = accessory
    })

    this.itemService.getAccessoryLower(this.id).subscribe(accessory =>{
      this.accessoryLower = accessory
    })

    this.itemService.getAccessoryItemLower(this.id).subscribe(accessory =>{
      this.accessoryItemLower = accessory
    })

  }

  onDeleteClick(){
    if(confirm('Are you sure?')){
      switch(this.accessory.category){
        case "Upper-Body":{
          this.itemService.deleteAccessoriesUpper(this.accessoryUpper)
          this.flashMessage.show('Accessory Removed',{
            cssClass: 'alert-success', timeout: 4000
          });
          this.router.navigate(['/admin/dash']);
          break;
        }
        case "Upper-Body-Item":{
          this.itemService.deleteAccessoriesItemsUpper(this.accessoryItemUpper)
          this.flashMessage.show('Accessory Removed',{
            cssClass: 'alert-success', timeout: 4000
          });
          this.router.navigate(['/admin/dash']);
          break;
        }
        case "Lower-Body":{
          this.itemService.deleteAccessoriesLower(this.accessoryLower)
          this.flashMessage.show('Accessory Removed',{
            cssClass: 'alert-success', timeout: 4000
          });
          this.router.navigate(['/admin/dash']);
          break;
        }
        case "Lower-Body-Item": {
          this.itemService.deleteAccessoriesItemsLower(this.accessoryItemLower)
          this.flashMessage.show('Accessory Removed',{
            cssClass: 'alert-success', timeout: 4000
          });
          this.router.navigate(['/admin/dash']);
          break;
        }
      }

     
    }
  }


}
