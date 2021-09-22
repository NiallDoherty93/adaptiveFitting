import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ProductItems } from 'src/app/models/product-items';
import { Subscription } from 'rxjs';
import { AccessoriesUpper } from 'src/app/models/accessories-upper';
import { AccessoriesItemsUpper } from 'src/app/models/accessorries-items-upper';
import { AccessoriesLower } from 'src/app/models/accessories-lower';
import { AccessoriesItemsLower } from 'src/app/models/accessories-items-lower';
import { Accessories } from 'src/app/models/accessories';

@Component({
  selector: 'app-admin-accessories',
  templateUrl: './admin-accessories.component.html',
  styleUrls: ['./admin-accessories.component.css'
],   template: `
<div>
  <ngx-datatable [rows]="rows" [columns]="columns"> </ngx-datatable>
</div>
`
})
export class AdminAccessoriesComponent implements OnInit {
  accessories: Accessories[] = [];

  accessoriesUpper:Accessories[] = []
  accessoriesItemsUpper:Accessories[] = []
  accessoriesLower: Accessories[] = []
  accessoriesItemsLower: Accessories[] = []
  // accessory!: AccessoriesUpper | AccessoriesItemsUpper | AccessoriesLower | AccessoriesItemsLower;
  subscriptionUpper: Subscription|any;
  subscriptionItemUpper: Subscription|any;
  subscriptionLower: Subscription|any;
  subscriptionItemLower: Subscription|any;
  

  filteredAccessoryUpper: Accessories[] = [];
  filteredAccessoryItemUpper: Accessories[] = [];
  filteredAccessoryLower: Accessories[] = [];
  filteredAccessoryItemLower: Accessories[] = [];

  constructor(private itemService: ItemsService) { 
    this.subscriptionUpper= this.itemService.getAccessoriesUpper().subscribe(accessoriesUpper=> {
      this.filteredAccessoryUpper= this.accessoriesUpper = accessoriesUpper
    })
    this.subscriptionItemUpper= this.itemService.getAccessoriesItemsUpper().subscribe(accessoriesItemsUpper=> {
      this.filteredAccessoryItemUpper= this.accessoriesItemsUpper = accessoriesItemsUpper
    })
    this.subscriptionLower= this.itemService.getAccessoriesLower().subscribe(accessoriesLower=> {
      this.filteredAccessoryLower= this.accessoriesLower = accessoriesLower
    })
    this.subscriptionItemLower= this.itemService.getAccessoriesItemsLower().subscribe(accessoriesItemsLower=> {
      this.filteredAccessoryItemLower= this.accessoriesItemsLower = accessoriesItemsLower
    })
  }

 

  ngOnInit(): void {
    // this.getAccessoryTypes();
  
    this.itemService.getAccessoriesUpper().subscribe(accessories => {
      this.accessories = accessories
    }),

    this.itemService.getAccessoriesItemsUpper().subscribe(accessories => {
      this.accessories = accessories
    }),

    this.itemService.getAccessoriesLower().subscribe(accessories => {
      this.accessories = accessories
    }),

    this.itemService.getAccessoriesItemsLower().subscribe(accessories => {
      this.accessories = accessories
    })


  }



  filterUpper(query: string){
    this.filteredAccessoryUpper=(query)?
    this.filteredAccessoryUpper.filter(p => p.item?.toLowerCase().includes(query.toLowerCase())) :
    this.filteredAccessoryUpper;
  }

  filterItemUpper(query: string){
    this.filteredAccessoryItemUpper=(query)?
    this.filteredAccessoryItemUpper.filter(p => p.item?.toLowerCase().includes(query.toLowerCase())) :
    this.filteredAccessoryItemUpper;
  }

  filterLower(query: string){
    this.filteredAccessoryLower=(query)?
    this.filteredAccessoryLower.filter(p => p.item?.toLowerCase().includes(query.toLowerCase())) :
    this.filteredAccessoryLower;
  }

  filterItemLower(query: string){
    this.filteredAccessoryItemLower=(query)?
    this.filteredAccessoryItemLower.filter(p => p.item?.toLowerCase().includes(query.toLowerCase())) :
    this.filteredAccessoryItemLower;
  }



  ngOnDestroy(){
    this.subscriptionUpper.unsubscribe()
    this.subscriptionItemUpper.unsubscribe()
    this.subscriptionLower.unsubscribe()
    this.subscriptionItemLower.unsubscribe()
  }

}
 
  
  




   


  
 
  
