import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { NgForm } from '@angular/forms';
import { AccessoriesUpper } from 'src/app/models/accessories-upper';
import { AccessoriesItemsUpper } from 'src/app/models/accessorries-items-upper';
import { AccessoriesLower } from 'src/app/models/accessories-lower';
import { AccessoriesItemsLower } from 'src/app/models/accessories-items-lower';
import { Accessories } from 'src/app/models/accessories';

@Component({
  selector: 'app-admin-edit-accessories',
  templateUrl: './admin-edit-accessories.component.html',
  styleUrls: ['./admin-edit-accessories.component.css']
})
export class AdminEditAccessoriesComponent implements OnInit {
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

  onSubmit({value, valid}: NgForm){
    if(!valid){
      this.flashMessage.show('Please fill out the form correctly',{
          cssClass: 'alert-danger', timeout: 4000
      });
    }else{
      // add id to client
      value.id= this.id;

      switch(this.accessory.category){
        case "Upper-Body":{
          this.itemService.updateAccessoriesUpper(value)
          this.flashMessage.show('Accessory Updated',{
            cssClass: 'alert-success', timeout: 4000
          });
          this.router.navigate(['/admin/detailsaccessories/'+this.id])
          break;
        }
        case "Upper-Body-Item":{
          this.itemService.updateAccessoriesItemsUpper(value)
          this.flashMessage.show('Accessory Updated',{
            cssClass: 'alert-success', timeout: 4000
          });
          this.router.navigate(['/admin/detailsaccessories/'+this.id])
          break;
        }
        case "Lower-Body":{
          this.itemService.updateAccessoriesLower(value)
          this.flashMessage.show('Accessory Updated',{
            cssClass: 'alert-success', timeout: 4000
          });
          this.router.navigate(['/admin/detailsaccessories/'+this.id])
          break;
        }
        case "Lower-Body-Item": {
          this.itemService.updateAccessoriesItemsLower(value)
          this.flashMessage.show('Accessory Updated',{
            cssClass: 'alert-success', timeout: 4000
          });
          this.router.navigate(['/admin/detailsaccessories/'+this.id])
          break;
        }
      }

    
}

}

}
