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
  // accessoriesUpper!:AccessoriesUpper[]
  // accessoriesItemsUpper!:AccessoriesItemsUpper[] 
  // accessoriesLower!: AccessoriesLower[] 
  // accessoriesItemsLower!: AccessoriesItemsLower[]
  // accessory!: AccessoriesUpper | AccessoriesItemsUpper | AccessoriesLower | AccessoriesItemsLower;
  subscription: Subscription|any;

  filteredProducts: Accessories[] = [];

  constructor(private itemService: ItemsService) { 
    this.subscription= this.itemService.getAccessoriesUpper().subscribe(accessoriesUpper=> {
      this.filteredProducts= this.accessories = accessoriesUpper
    })
    this.subscription= this.itemService.getAccessoriesItemsUpper().subscribe(accessoriesItemsUpper=> {
      this.filteredProducts= this.accessories = accessoriesItemsUpper
    })
    this.subscription= this.itemService.getAccessoriesLower().subscribe(accessoriesLower=> {
      this.filteredProducts= this.accessories = accessoriesLower
    })
    this.subscription= this.itemService.getAccessoriesItemsLower().subscribe(accessoriesItemsLower=> {
      this.filteredProducts= this.accessories = accessoriesItemsLower
    })
  }

 

  ngOnInit(): void {
    this.getAccessoryTypes();
  
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

  private getAccessoryTypes(): void {
    this.itemService.getAccessoriesUpper().subscribe(accessoriesUpper => {
      //@ts-ignore
      this.filteredProducts.push(accessoriesUpper);
    })
  }


  filter(query: string){
    this.filteredProducts=(query)?
    this.accessories.filter(a => a.item?.toLowerCase().includes(query.toLowerCase())) :
    this.accessories;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
 
  
  




   


  
 
  
