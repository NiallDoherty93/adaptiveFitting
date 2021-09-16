import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { ProductItems } from '../models/product-items';
import { first, map, switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/user-details';
import { ShoppingCart } from '../models/shopping-cart';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ShoppingCartItem } from '../models/ShoppingCartItem';

import { AccessoriesUpper } from '../models/accessories-upper';
import { AccessoriesItemsUpper } from '../models/accessorries-items-upper';

import { AccessoriesLower } from '../models/accessories-lower';
import { AccessoriesItemsLower } from '../models/accessories-items-lower';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  carts: Observable<ShoppingCart[]> | any;
  cartCollection: AngularFirestoreCollection<ShoppingCart> | any;
  cart: Observable<ShoppingCart> | any;
  cartDoc: AngularFirestoreDocument<ShoppingCart> | any;

  cartItems: Observable<ShoppingCartItem[]> | any;
  cartItemsCollection: AngularFirestoreCollection<ShoppingCartItem> | any;
  cartItem: Observable<ShoppingCartItem> | any;
  cartItemDoc: AngularFirestoreDocument<ShoppingCartItem> | any;



  itemsCollection: AngularFirestoreCollection<ProductItems> | any;
  itemDoc!: AngularFirestoreDocument<ProductItems>;
  items!: Observable<ProductItems[]>;
  // item: Observable<ProductItems> | any;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {}
  //private db: AngularFireDatabase

  public create() {
    return this.db.collection('shopping-cart').add({
      dateCreated: new Date().getTime(),
    });
  }

  async addItemToCart(product: ProductItems) {
    this.updateItemQuantity(product, 1);
  }

  async removeItemFromCart(product: ProductItems) {
    this.updateItemQuantity(product, -1);
  }

  public async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let res = await this.create();
      localStorage.setItem('cartId', res.id);

      return res.id;
    } else {
      return cartId;
    }
  }

  private getItem(cartId: string, productId: any) {
    return this.db
      .collection('shopping-cart')
      .doc(cartId)
      .collection('product-items')
      .doc(productId);
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .collection('shopping-cart/' + cartId + '/product-items')
      .valueChanges()
      .pipe(
        map((item: any) => {
          console.log(item);
          let cart: ShoppingCart = {
            dateCreated: 0,
            items: item,
            // accessoryUpper: accessoryUpper,
          };

          this.db
            .collection('shopping-cart')
            .doc<{ dateCreated: number }>(cartId)
            .valueChanges()
            .pipe(first())
            .subscribe((d) => {
              cart.dateCreated = d?.dateCreated;
            });

          return cart;
        })
      );
  }


  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    console.log(cartId)

    this.db
      .collection('shopping-cart/' + cartId + '/product-items')
  .valueChanges()
  .pipe(
    // first(),
    map((p) => {
      console.log(p)
      return p.map((p: any) => {
        
        return p.product ? p.product.id : p.accessory.id;

      });
    })
  )
  .subscribe((productIdArray) => {
    productIdArray.forEach((productId: any) => {
      this.db
        .collection('shopping-cart/' + cartId + '/product-items')
        .doc(productId)
        .delete();
    });
  });
  }

  private async updateItemQuantity(product: ProductItems, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.id);

    item$
      .valueChanges()
      .pipe(first())
      .subscribe((item: any) => {
        let quantity = (item?.quantity || 0) + change;

        if (quantity === 0) {
          item$.delete();
        } else {
          item$.set({
            product: product,
            quantity: quantity,
          });
        }
      });
  }
  //upper

  private async updateAccessoryUpperQuantity(
    accessory: AccessoriesUpper,
    change: number
  ) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getAccessoryUpper(cartId, accessory.id);

    item$
      .valueChanges()
      .pipe(first())
      .subscribe((item: any) => {
        let quantity = (item?.quantity || 0) + change;

        if (quantity === 0) {
          item$.delete();
        } else {
          item$.set({
            accessory: accessory,
            quantity: quantity,
          });
        }
      });
  }

  private getAccessoryUpper(cartId: string, accessoryId: any) {
    return this.db
      .collection('shopping-cart')
      .doc(cartId)
      .collection('product-items')
      .doc(accessoryId);
  }

  async addAccessoryUpperToCart(accessory: AccessoriesUpper) {
    this.updateAccessoryUpperQuantity(accessory, 1);
  }

  //item upper

  private async updateAccessoryItemsUpperQuantity(
    accessory: AccessoriesItemsUpper,
    change: number
  ) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getAccessoryItemUpper(cartId, accessory.id);

    item$
      .valueChanges()
      .pipe(first())
      .subscribe((item: any) => {
        let quantity = (item?.quantity || 0) + change;

        if (quantity === 0) {
          item$.delete();
        } else {
          item$.set({
            accessory: accessory,
            quantity: quantity,
          });
        }
      });
  }

  private getAccessoryItemUpper(cartId: string, accessoryId: any) {
    return this.db
      .collection('shopping-cart')
      .doc(cartId)
      .collection('product-items')
      .doc(accessoryId);
  }

  async addAccessoryItemUpperToCart(accessory: AccessoriesItemsUpper) {
    this.updateAccessoryItemsUpperQuantity(accessory, 1);
  }

  //lower

  private async updateAccessoryLowerQuantity(
    accessory: AccessoriesLower,
    change: number
  ) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getAccessoryLower(cartId, accessory.id);

    item$
      .valueChanges()
      .pipe(first())
      .subscribe((item: any) => {
        let quantity = (item?.quantity || 0) + change;

        if (quantity === 0) {
          item$.delete();
        } else {
          item$.set({
            accessory: accessory,
            quantity: quantity,
          });
        }
      });
  }

  private getAccessoryLower(cartId: string, accessoryId: any) {
    return this.db
      .collection('shopping-cart')
      .doc(cartId)
      .collection('product-items')
      .doc(accessoryId);
  }

  async addAccessoryLowerToCart(accessory: AccessoriesLower) {
    this.updateAccessoryLowerQuantity(accessory, 1);
  }

  //item lower

  private async updateAccessoryItemLowerQuantity(
    accessory: AccessoriesItemsLower,
    change: number
  ) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getAccessoryItemLower(cartId, accessory.id);

    item$
      .valueChanges()
      .pipe(first())
      .subscribe((item: any) => {
        let quantity = (item?.quantity || 0) + change;

        if (quantity === 0) {
          item$.delete();
        } else {
          item$.set({
            accessory: accessory,
            quantity: quantity,
          });
        }
      });
  }

  private getAccessoryItemLower(cartId: string, accessoryId: any) {
    return this.db
      .collection('shopping-cart')
      .doc(cartId)
      .collection('product-items')
      .doc(accessoryId);
  }

  async addAccessoryItemsLowerToCart(accessory: AccessoriesItemsLower) {
    this.updateAccessoryItemLowerQuantity(accessory, 1);
  }
}
