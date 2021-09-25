import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { ItemsService } from 'src/app/services/items.service';
import { Router } from '@angular/router';
import { ProductItems } from 'src/app/models/product-items';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css'],
})
export class AdminAddProductComponent implements OnInit {
  product: ProductItems = {
    item: '',
    description: '',
    image: '',
    category: '',
  };

  @ViewChild('productForm') form: any;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private itemService: ItemsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit({ value, valid }: NgForm) {
    // if form is invalid, show an error message
    if (!valid) {
      //show error displayed using flashMessagesService import - assigned in constrctor
      this.flashMessagesService.show('Please fill out the form correctly', {
        //use of global variable to determine length of time message shows for
        cssClass: 'alert-danger',
        timeout: FLASH_MESSAGE_TIMEOUT,
      });
    } else {
      // if the form values are valid, values then placed into the parameter of the create item method.
      this.itemService.createItem(value);
      //use of global variable to determine length of time message shows for
      this.flashMessagesService.show('New item added!', {
        cssClass: 'alert-success',
        timeout: FLASH_MESSAGE_TIMEOUT,
      });
      // redirect to dash once item added successfully
      this.router.navigate(['/admin/dash']);
    }
  }
}
