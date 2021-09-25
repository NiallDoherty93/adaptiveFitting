import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Accessories } from 'src/app/models/accessories';
import {
  ACCESSORY_ITEM_LOWER,
  ACCESSORY_ITEM_UPPER,
  ACCESSORY_LOWER,
  ACCESSORY_UPPER,
  FLASH_MESSAGE_TIMEOUT,
} from 'src/app/global/application-constants';

@Component({
  selector: 'app-admin-details-accessories',
  templateUrl: './admin-details-accessories.component.html',
  styleUrls: ['./admin-details-accessories.component.css'],
})
export class AdminDetailsAccessoriesComponent implements OnInit {
  idUpper: string;
  idUpperItem: string;
  idLower: string;
  idLowerItem: string;
  accessory: Accessories;
  accessoryUpper: Accessories;
  accessoryItemUpper: Accessories;
  accessoryLower: Accessories;
  accessoryItemLower: Accessories;

  constructor(
    private itemService: ItemsService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    // setting variable idUpper to the document Id to the document ID in the URL
    this.idUpper = this.route.snapshot.params['id'];

    // calling the primary upper body fitting document held in the server that matches that ID
    this.itemService
      .getAccessoryUpper(this.idUpper)
      .subscribe((accessoryUpper) => {
        this.accessoryUpper = accessoryUpper;
      });
    // setting variable idUpperItem to the document Id to the document ID in the URL
    this.idUpperItem = this.route.snapshot.params['id'];
    // calling the secondary upper body fitting document held in the server that matches that ID
    this.itemService
      .getAccessoryItemUpper(this.idUpperItem)
      .subscribe((accessoryItemUpper) => {
        this.accessoryItemUpper = accessoryItemUpper;
      });
    // setting variable idLower to the document Id to the document ID in the URL
    this.idLower = this.route.snapshot.params['id'];
    // calling the primary lower body fitting document held in the server that matches that ID
    this.itemService
      .getAccessoryLower(this.idLower)
      .subscribe((accessoryLower) => {
        this.accessoryLower = accessoryLower;
      });
    // setting variable idLowerItem to the document Id to the document ID in the URL
    this.idLowerItem = this.route.snapshot.params['id'];
    // calling the secondary lower body fitting document held in the server that matches that ID
    this.itemService
      .getAccessoryItemLower(this.idLowerItem)
      .subscribe((accessoryItemLower) => {
        this.accessoryItemLower = accessoryItemLower;
      });
  }

  // to delete a fitting
  onDeleteClick() {
    //confimation pop up box
    if (confirm('Are you sure?')) {
      // switch statement used to determine what sort of fitting is being deleted (type = category)
      switch (
        this.accessoryUpper?.type ||
        this.accessoryItemUpper?.type ||
        this.accessoryLower?.type ||
        this.accessoryItemLower?.type
      ) {
        // use of global variables
        case ACCESSORY_UPPER: {
          // passing the parameter of primary upper body accessory
          this.itemService.deleteAccessoriesUpper(this.accessoryUpper);
          this.flashMessage.show('Accessory Removed', {
            // flash message to show success message
            cssClass: 'alert-success',
            timeout: FLASH_MESSAGE_TIMEOUT,
          });
          // route once the delete method has been called and exectued
          this.router.navigate(['/admin/accessories']);
          break;
        }
        // use of global variables
        case ACCESSORY_ITEM_UPPER: {
          // passing the parameter of secondary upper body accessory
          this.itemService.deleteAccessoriesItemsUpper(this.accessoryItemUpper);
          this.flashMessage.show('Accessory Removed', {
            // flash message to show success message
            cssClass: 'alert-success',
            timeout: FLASH_MESSAGE_TIMEOUT,
          });
          // route once the delete method has been called and exectued
          this.router.navigate(['/admin/accessories']);
          break;
        }
        case ACCESSORY_LOWER: {
          // passing the parameter of primary lower body accessory
          this.itemService.deleteAccessoriesLower(this.accessoryLower);
          this.flashMessage.show('Accessory Removed', {
            // flash message to show success message
            cssClass: 'alert-success',
            timeout: FLASH_MESSAGE_TIMEOUT,
          });
          // route once the delete method has been called and exectued
          this.router.navigate(['/admin/accessories']);
          break;
        }
        case ACCESSORY_ITEM_LOWER: {
          // passing the parameter of secondary lower body accessory
          this.itemService.deleteAccessoriesItemsLower(this.accessoryItemLower);
          this.flashMessage.show('Accessory Removed', {
            // flash message to show success message
            cssClass: 'alert-success',
            timeout: FLASH_MESSAGE_TIMEOUT,
          });
          // route once the delete method has been called and exectued
          this.router.navigate(['/admin/accessories']);
          break;
        }
      }
    }
  }
}
