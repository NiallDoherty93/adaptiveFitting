import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { ItemsService } from 'src/app/services/items.service';
import { Router } from '@angular/router';
import {
  ACCESSORY_ITEM_LOWER,
  ACCESSORY_ITEM_UPPER,
  ACCESSORY_LOWER,
  ACCESSORY_UPPER,
  FLASH_MESSAGE_TIMEOUT,
} from 'src/app/global/application-constants';
import { Accessories } from 'src/app/models/accessories';

@Component({
  selector: 'app-admin-add-accessories',
  templateUrl: './admin-add-accessories.component.html',
  styleUrls: ['./admin-add-accessories.component.css'],
})
export class AdminAddAccessoriesComponent implements OnInit {
  accessoryUpper: Accessories;
  accessoryItemUpper: Accessories;
  accessoryLower: Accessories;
  accessoryItemLower: Accessories;

  accessory: Accessories = {
    type: '',
    item: '',
    description: '',
    image: '',
    category: '',
  };

  constructor(
    private flashMessagesService: FlashMessagesService,
    private itemService: ItemsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit({ value, valid }: NgForm, accessories: Accessories) {
    if (!valid) {
      //showing an error message if any of the invalid parmamters were met in the form
      // Use of flash message import with FLASH_MESSAGE_TIMEOUT being used as a global variable
      this.flashMessagesService.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: FLASH_MESSAGE_TIMEOUT,
      });
    } else {
      // swtich statement to handle category option selection in the HTML file
      switch (accessories.type) {
        // use of global variable
        case ACCESSORY_UPPER: {
          // calling createAccessoriesUpper(value) - value is the value submitted in the form - creating a fitting that relates to a primary fitting for the upper body
          this.itemService.createAccessoriesUpper(value);
          // navigatating back to the admin dashboard once fitting has been added
          this.router.navigate(['/admin/dash']);
          break;
        }
        // use of global variable
        case ACCESSORY_ITEM_UPPER: {
          // calling createAccessoriesItemsUpper(value) - value is the value submitted in the form - creating a fitting that relates to a secondary fitting for the upper body
          this.itemService.createAccessoriesItemsUpper(value);
          // navigatating back to the admin dashboard once fitting has been added
          this.router.navigate(['/admin/dash']);
          break;
        }
        // use of global variable
        case ACCESSORY_LOWER: {
          // calling createAccessoriesItemsUpper(value) - value is the value submitted in the form - creating a fitting that relates to a primary fitting for the lower body
          this.itemService.createAccessoriesLower(value);
          // navigatating back to the admin dashboard once fitting has been added
          this.router.navigate(['/admin/dash']);
          break;
        }
        // use of global variable
        case ACCESSORY_ITEM_LOWER: {
          // calling createAccessoriesItemsUpper(value) - value is the value submitted in the form - creating a fitting that relates to a secondary fitting for the lower body
          this.itemService.createAccessoriesItemsLower(value);
          // navigatating back to the admin dashboard once fitting has been added
          this.router.navigate(['/admin/dash']);
          break;
        }
      }
    }
  }
}
