import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { NgForm } from '@angular/forms';
import { Accessories } from 'src/app/models/accessories';
import {
  ACCESSORY_ITEM_LOWER,
  ACCESSORY_ITEM_UPPER,
  ACCESSORY_LOWER,
  ACCESSORY_UPPER,
  FLASH_MESSAGE_TIMEOUT,
} from 'src/app/global/application-constants';

@Component({
  selector: 'app-admin-edit-accessories',
  templateUrl: './admin-edit-accessories.component.html',
  styleUrls: ['./admin-edit-accessories.component.css'],
})
export class AdminEditAccessoriesComponent implements OnInit {
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
    //get id from url to use for parameter in the getAccessoryUpper() method called from the item service
    this.idUpper = this.route.snapshot.params['id'];
    //put id held in URL into getAccessoryUpper()
    this.itemService
      .getAccessoryUpper(this.idUpper)
      .subscribe((accessoryUpper) => {
        this.accessoryUpper = accessoryUpper;
      });
    //get id from url to use for parameter in the getAccessoryItemUpper() method called from the item service
    this.idUpperItem = this.route.snapshot.params['id'];
    //put id held in URL into getAccessoryItemUpper()
    this.itemService
      .getAccessoryItemUpper(this.idUpperItem)
      .subscribe((accessoryItemUpper) => {
        this.accessoryItemUpper = accessoryItemUpper;
      });
    //get id from url to use for parameter in the getAccessoryLower() method called from the item service
    this.idLower = this.route.snapshot.params['id'];
    //put id held in URL into getAccessoryLower()
    this.itemService
      .getAccessoryLower(this.idLower)
      .subscribe((accessoryLower) => {
        this.accessoryLower = accessoryLower;
      });
    //get id from url to use for parameter in the getAccessoryItemLower() method called from the item service
    this.idLowerItem = this.route.snapshot.params['id'];
    //put id held in URL into getAccessoryItemLower()
    this.itemService
      .getAccessoryItemLower(this.idLowerItem)
      .subscribe((accessoryItemLower) => {
        this.accessoryItemLower = accessoryItemLower;
      });
  }

  onSubmit({ value, valid }: NgForm) {
    // conditonal if the form is invalid - error message shown
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        // use of global variable FLASH_MESSAGE_TIMEOUT
        cssClass: 'alert-danger',
        timeout: FLASH_MESSAGE_TIMEOUT,
      });
    } else {
      // variable value id can equal id of any primary or secondary fitting type
      value.id =
        this.idUpper || this.idUpperItem || this.idLower || this.idLowerItem;

      // swtiching on accessory (fitting) type
      switch (
        this.accessoryUpper?.type ||
        this.accessoryItemUpper?.type ||
        this.accessoryLower?.type ||
        this.accessoryItemLower?.type
      ) {
        // if primary fitting for upper body
        // use of global constant on switch
        case ACCESSORY_UPPER: {
          // input value paramter applicable value type held in HTML form
          this.itemService.updateAccessoriesUpper(value);
          // flash message showing success - use of global constant for flash message display time
          this.flashMessage.show('Accessory Updated', {
            cssClass: 'alert-success',
            timeout: FLASH_MESSAGE_TIMEOUT,
          });
          // navigate once method called and exectuted
          this.router.navigate(['/admin/detailsaccessories/' + this.idUpper]);
          break;
        }
        // if secondary fitting for upper body
        // use of global constant on switch
        case ACCESSORY_ITEM_UPPER: {
          // input value paramter applicable value type held in HTML form
          this.itemService.updateAccessoriesItemsUpper(value);
          this.flashMessage.show('Accessory Updated', {
            cssClass: 'alert-success',
            timeout: FLASH_MESSAGE_TIMEOUT,
          });
          // navigate once method called and exectuted
          this.router.navigate([
            '/admin/detailsaccessories/' + this.idUpperItem,
          ]);
          break;
        }
        // if primary fitting for lower body
        // use of global constant on switch
        case ACCESSORY_LOWER: {
          // input value paramter applicable value type held in HTML form
          this.itemService.updateAccessoriesLower(value);
          // flash message showing success - use of global constant for flash message display time
          this.flashMessage.show('Accessory Updated', {
            cssClass: 'alert-success',
            timeout: FLASH_MESSAGE_TIMEOUT,
          });
          // navigate once method called and exectuted
          this.router.navigate(['/admin/detailsaccessories/' + this.idLower]);
          break;
        }
        // if secondary fitting for lower body
        // use of global constant on switch
        case ACCESSORY_ITEM_LOWER: {
          // input value paramter applicable value type held in HTML form
          this.itemService.updateAccessoriesItemsLower(value);
          // flash message showing success - use of global constant for flash message display time
          this.flashMessage.show('Accessory Updated', {
            cssClass: 'alert-success',
            timeout: FLASH_MESSAGE_TIMEOUT,
          });
          // navigate once method called and exectuted
          this.router.navigate([
            '/admin/detailsaccessories/' + this.idLowerItem,
          ]);
          break;
        }
      }
    }
  }
}
