import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Subscription } from 'rxjs';
import { Accessories } from 'src/app/models/accessories';

@Component({
  selector: 'app-admin-accessories',
  templateUrl: './admin-accessories.component.html',
  styleUrls: ['./admin-accessories.component.css'],
  template: `
    <div>
      <ngx-datatable [rows]="rows" [columns]="columns"> </ngx-datatable>
    </div>
  `,
})
export class AdminAccessoriesComponent implements OnInit {
  accessories: Accessories[] = [];
  accessoriesUpper: Accessories[] = [];
  accessoriesItemsUpper: Accessories[] = [];
  accessoriesLower: Accessories[] = [];
  accessoriesItemsLower: Accessories[] = [];
  
  subscriptionUpper: Subscription | any;
  subscriptionItemUpper: Subscription | any;
  subscriptionLower: Subscription | any;
  subscriptionItemLower: Subscription | any;

  filteredAccessoryUpper: Accessories[] = [];
  filteredAccessoryItemUpper: Accessories[] = [];
  filteredAccessoryLower: Accessories[] = [];
  filteredAccessoryItemLower: Accessories[] = [];

  constructor(private itemService: ItemsService) {
    // Assigning primary upper body fittings to value of filteredAccessoriesUpper
    this.subscriptionUpper = this.itemService
      .getAccessoriesUpper()
      .subscribe((accessoriesUpper) => {
        this.filteredAccessoryUpper = this.accessoriesUpper = accessoriesUpper;
      });
    // Assigning secondary upper body fittings to value of filteredAccessoryItemUpper
    this.subscriptionItemUpper = this.itemService
      .getAccessoriesItemsUpper()
      .subscribe((accessoriesItemsUpper) => {
        this.filteredAccessoryItemUpper = this.accessoriesItemsUpper =
          accessoriesItemsUpper;
      });
    // Assigning primary lower body fittings to value of filteredAccessoryLower
    this.subscriptionLower = this.itemService
      .getAccessoriesLower()
      .subscribe((accessoriesLower) => {
        this.filteredAccessoryLower = this.accessoriesLower = accessoriesLower;
      });
    // Assigning secondary lower body fittings to value of filteredAccessoryItemLower
    this.subscriptionItemLower = this.itemService
      .getAccessoriesItemsLower()
      .subscribe((accessoriesItemsLower) => {
        this.filteredAccessoryItemLower = this.accessoriesItemsLower =
          accessoriesItemsLower;
      });
  }

  ngOnInit(): void {
    // Calling get method to get all primary upper body fittings held in the server
    this.itemService.getAccessoriesUpper().subscribe((accessories) => {
      this.accessories = accessories;
    }),
      // Calling get method to get all secondary upper body fittings held in the server
      this.itemService.getAccessoriesItemsUpper().subscribe((accessories) => {
        this.accessories = accessories;
      }),
      // Calling get method to get all primary lower body fittings held in the server
      this.itemService.getAccessoriesLower().subscribe((accessories) => {
        this.accessories = accessories;
      }),
      // Calling get method to get all secondary lower body fittings held in the server
      this.itemService.getAccessoriesItemsLower().subscribe((accessories) => {
        this.accessories = accessories;
      });
  }

  // method to handle the search method from the user relating to primary upper body fittings . The paramter query is the users search value
  filterUpper(query: string) {
    this.filteredAccessoryUpper = query
      ? this.filteredAccessoryUpper.filter((p) =>
          // putting all values to lower case to avoid case sensitivty problems
          p.item?.toLowerCase().includes(query.toLowerCase())
        )
      : this.filteredAccessoryUpper;
  }
  // method to handle the search method from the user relating to secondary upper body fittings . The paramter query is the users search value
  filterItemUpper(query: string) {
    this.filteredAccessoryItemUpper = query
      ? this.filteredAccessoryItemUpper.filter((p) =>
          p.item?.toLowerCase().includes(query.toLowerCase())
        )
      : this.filteredAccessoryItemUpper;
  }
  // method to handle the search method from the user relating to primary lower body fittings . The paramter query is the users search value
  filterLower(query: string) {
    this.filteredAccessoryLower = query
      ? this.filteredAccessoryLower.filter((p) =>
          p.item?.toLowerCase().includes(query.toLowerCase())
        )
      : this.filteredAccessoryLower;
  }
  // method to handle the search method from the user relating to secondary lower body fittings . The paramter query is the users search value
  filterItemLower(query: string) {
    this.filteredAccessoryItemLower = query
      ? this.filteredAccessoryItemLower.filter((p) =>
          p.item?.toLowerCase().includes(query.toLowerCase())
        )
      : this.filteredAccessoryItemLower;
  }

  // Unsubscribing from obserables in the constrctor - avoids memory leaks
  ngOnDestroy() {
    this.subscriptionUpper.unsubscribe();
    this.subscriptionItemUpper.unsubscribe();
    this.subscriptionLower.unsubscribe();
    this.subscriptionItemLower.unsubscribe();
  }
}
