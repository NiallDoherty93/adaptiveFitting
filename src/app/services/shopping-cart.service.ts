import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { ProductItems } from '../models/product-items';
import { first, map, switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { AngularFireAuth } from '@angular/fire/auth';
import { Accessories } from '../models/accessories';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  carts: Observable<ShoppingCart[]> | any;
  cartCollection: AngularFirestoreCollection<ShoppingCart> | any;
  cart: Observable<ShoppingCart> | any;
  cartDoc: AngularFirestoreDocument<ShoppingCart> | any;

  itemsCollection: AngularFirestoreCollection<ProductItems> | any;
  itemDoc!: AngularFirestoreDocument<ProductItems>;
  items!: Observable<ProductItems[]>;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {}

  // creates a document inside the collection 'shopping-cart'
  public create() {
    return this.db.collection('shopping-cart').add({
      // adds a date-time stamp to that document
      dateCreated: new Date().getTime(),
    });
  }
  // accepts parameter of type ProductItems - will accept product (garment) - as parameter
  async addItemToCart(product: ProductItems) {
    this.updateItemQuantity(product, 1);
  }

  // gets or create a cart document ID
  public async getOrCreateCartId(): Promise<string> {
    // setting cartId to equal the cartId in the server and hold it in the local storage
    let cartId = localStorage.getItem('cartId');
    // if no cartId exists, calls the create() method on line 35
    if (!cartId) {
      let res = await this.create();
      // once the cart has been created, stores the cart ID in the local storage
      // id stored in local storage to ensure cart is saved if user exists browser
      localStorage.setItem('cartId', res.id);
      // returing the cart ID if create called
      return res.id;
    } else {
      // returing the cart ID if cart ID already existed
      return cartId;
    }
  }

  // gets the garments in the cart - accepts paramters cartId and productId - to identify what cart to call
  private getItem(cartId: string, productId: any) {
    return (
      this.db
        // returns the cartId in the 'shopping-cart' collection
        .collection('shopping-cart')
        .doc(cartId)
        // returns subcollection productId in the 'product-items' collection
        .collection('product-items')
        .doc(productId)
    );
  }

  // gets shopping cart
  async getCart(): Promise<Observable<ShoppingCart>> {
    // setting cartId to await the getOrCreateCartId method
    let cartId = await this.getOrCreateCartId();
    // return the collection 'shopping-cart/' where the document ID is the cartId, then get the subcollection '/product-items' - where the
    // added items are held
    return this.db
      .collection('shopping-cart/' + cartId + '/product-items')
      .valueChanges()
      .pipe(
        map((item: any) => {
          // cart is to be of interface type ShoppingCart
          let cart: ShoppingCart = {
            // date created set to 0 as default until date is called
            dateCreated: 0,
            // items are set to type any
            items: item,
          };
          // second call made to 'shopping-cart'
          this.db
            .collection('shopping-cart')
            // calling document Id that is equal to cart id and date created as a number (as date needs to be formatted)
            .doc<{ dateCreated: number }>(cartId)
            .valueChanges()
            .pipe(first())
            .subscribe((d) => {
              cart.dateCreated = d?.dateCreated;
            });
          // returning cart
          return cart;
        })
      );
  }

  // clearing the cart of all items
  async clearCart() {
    // setting cartId to await the getOrCreateCartId method
    let cartId = await this.getOrCreateCartId();
    this.db
      // calling the relevant document by the cart Id
      .collection('shopping-cart/' + cartId + '/product-items')
      .valueChanges()
      .pipe(
        // looping over all the items in the cart (can be a garment - product, or accessory - fitting)
        map((p) => {
          return p.map((p: any) => {
            return p.product ? p.product.id : p.accessory.id;
            // returns these values as an array of type observable
          });
        })
      )
      // subscribes to the array of observables
      .subscribe((productIdArray) => {
        // for each item in the cart, delete each one of those items
        productIdArray.forEach((productId: any) => {
          this.db
            .collection('shopping-cart/' + cartId + '/product-items')
            .doc(productId)
            .delete();
        });
      });
  }

  // updating garment quanity in the shopping cart - takes parameter of type ProductItems, change is of type number
  private async updateItemQuantity(product: ProductItems, change: number) {
    // awaiting the cart Id
    let cartId = await this.getOrCreateCartId();
    // item$ set to the garments got from the collection relevant to the cart ID
    let item$ = this.getItem(cartId, product.id);
    // garment got from the relevant document are then updated in quanity.
    item$
      .valueChanges()
      .pipe(first())
      .subscribe((item: any) => {
        let quantity = (item?.quantity || 0) + change;
        item$.set({
          product: product,
          quantity: quantity,
        });
      });
  }

  // all of the above method logic applies to the remaining methods that deal with CRUD funactionality for the Fittings collections.
  // As different types of fittings are stored in different collections, variable names have been changed to accomdate this however all of the logic is the same
  // as the logic used in cart funtions for garments

  // primary fittings related to the upper body

  private async updateAccessoryUpperQuantity(
    accessory: Accessories,
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

  async addAccessoryUpperToCart(accessory: Accessories) {
    this.updateAccessoryUpperQuantity(accessory, 1);
  }

  // secondary fittings related to the upper body

  private async updateAccessoryItemsUpperQuantity(
    accessory: Accessories,
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

  async addAccessoryItemUpperToCart(accessory: Accessories) {
    this.updateAccessoryItemsUpperQuantity(accessory, 1);
  }

  // primary fittings related to the lower body

  private async updateAccessoryLowerQuantity(
    accessory: Accessories,
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

  async addAccessoryLowerToCart(accessory: Accessories) {
    this.updateAccessoryLowerQuantity(accessory, 1);
  }

  // secondary fittings related to the lower body

  private async updateAccessoryItemLowerQuantity(
    accessory: Accessories,
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

  async addAccessoryItemsLowerToCart(accessory: Accessories) {
    this.updateAccessoryItemLowerQuantity(accessory, 1);
  }
}
