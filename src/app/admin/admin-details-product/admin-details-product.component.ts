import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { ProductItems } from 'src/app/models/product-items';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';

@Component({
  selector: 'app-admin-details-product',
  templateUrl: './admin-details-product.component.html',
  styleUrls: ['./admin-details-product.component.css'],
})
export class AdminDetailsProductComponent implements OnInit {
  id: string | any;
  product: ProductItems | any;

  constructor(
    private itemService: ItemsService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    //get id from url to use for parameter in the getItem() method called from the item service
    this.id = this.route.snapshot.params['id'];
    //get product by ID held in the url
    this.itemService.getItem(this.id).subscribe((product) => {
      this.product = product;
    });
  }

  onDeleteClick() {
    // delete confimation pop up activator
    if (confirm('Are you sure?')) {
      // passing in the id of the product to be deleted - identifed by the details recived in the ngOnInit()
      this.itemService.deleteItem(this.product);
      // success message shown if user deleted successfully - use of global variables
      this.flashMessage.show('Product Removed', {
        cssClass: 'alert-success',
        timeout: FLASH_MESSAGE_TIMEOUT,
      });
      this.router.navigate(['/admin/products']);
    }
  }
}
