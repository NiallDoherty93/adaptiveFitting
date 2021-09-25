import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductItems } from '../models/product-items';
import { Accessories } from '../models/accessories';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  itemsCollection: AngularFirestoreCollection<ProductItems>;
  itemDoc!: AngularFirestoreDocument<ProductItems>;
  items!: Observable<ProductItems[]>;
  item: Observable<ProductItems> | any;

  accessoriesUpperCollection: AngularFirestoreCollection<Accessories>;
  accessoriesUpperDoc!: AngularFirestoreDocument<Accessories>;
  accessoriesUpper: Observable<Accessories[]> | any;
  accessoryUpper: Observable<Accessories> | any;

  accessoriesItemsUpperCollection: AngularFirestoreCollection<Accessories>;
  accessoriesItemsUpperDoc!: AngularFirestoreDocument<Accessories>;
  accessoriesItemsUpper: Observable<Accessories[]> | any;
  accessoryItemsUpper: Observable<Accessories> | any;

  accessoriesLowerCollection: AngularFirestoreCollection<Accessories>;
  accessoriesLowerDoc!: AngularFirestoreDocument<Accessories>;
  accessoriesLower: Observable<Accessories[]> | any;
  accessoryLower: Observable<Accessories> | any;

  accessoriesItemsLowerCollection: AngularFirestoreCollection<Accessories>;
  accessoriesItemsLowerDoc!: AngularFirestoreDocument<Accessories>;
  accessoriesItemsLower: Observable<Accessories[]> | any;
  accessoryItemsLower: Observable<Accessories> | any;

  // constructor sets variables declared at the top of file. Garments are stored in a collection called 'product-items'
  // primary fittings related to the upper body are stored in a collection called 'accessories-upper'
  // secondary fittings related to the upper body are stored in a collection called 'accessories-items-upper'
  // primary fittings related to the lower body are stored in a collection called 'accessories-lower'
  // secondary fittings related to the lower body are stored in a collection called 'accessories-items-lower'
  constructor(private afs: AngularFirestore) {
    // setting itemsCollection to values in the 'product-items' collection on firebase
    (this.itemsCollection = this.afs.collection('product-items', (ref) =>
      // ordering by category
      ref.orderBy('category', 'asc')
    )),
      // setting accessoriesUpperCollection to values in the 'accessories-items-upper' collection on firebase
      (this.accessoriesUpperCollection = this.afs.collection(
        'accessories-upper',
        (ref) =>
          // ordering by category
          ref.orderBy('type', 'asc')
      ));
    // setting accessoriesItemsUpperCollection to values in the 'accessories-items-upper' collection on firebase
    (this.accessoriesItemsUpperCollection = this.afs.collection(
      'accessories-items-upper',
      (ref) =>
        // ordering by category
        ref.orderBy('type', 'asc')
    )),
      // setting accessoriesLowerCollection to values in the 'accessories-lower' collection on firebase
      (this.accessoriesLowerCollection = this.afs.collection(
        'accessories-lower',
        (ref) =>
          // ordering by category
          ref.orderBy('type', 'asc')
      )),
      // setting accessoriesItemsLowerCollection to values in the 'accessories-items-lower' collection on firebase
      (this.accessoriesItemsLowerCollection = this.afs.collection(
        'accessories-items-lower',
        (ref) =>
          // ordering by category
          ref.orderBy('type', 'asc')
      ));
  }

  // adding a garment to the itemsCollection - takes a paramter of type ProductItems - a model/interface
  createItem(item: ProductItems) {
    this.itemsCollection.add(item);
  }
  // deleting a garment from firebase,
  deleteItem(item: ProductItems) {
    // sets the itemDoc varible equal to where the matching document ID exists in the collection
    this.itemDoc = this.afs.doc(`product-items/${item.id}`);
    // calling delete api request from firebase
    this.itemDoc.delete();
  }

  // updating a garment (item)
  updateItem(item: ProductItems) {
    // sets the itemDoc varible equal to where the matching document ID exists in the collection
    this.itemDoc = this.afs.doc(`product-items/${item.id}`);
    // calling update api request from firebase
    this.itemDoc.update(item);
  }

  // getting all garments in the itemsCollection - defined in the constructor, returns an observable of type ProductItems
  getItems(): Observable<ProductItems[]> {
    // setting item variable to equal all the items stored in the server in that given collection
    this.items = this.itemsCollection.snapshotChanges().pipe(
      // map applies a given project function to each value emitted by the source Observable, and emits the resulting values as an Observable.
      map((changes) => {
        // map used again to calls a defined callback function on each element of an array, and returns an array that contains the results.
        return changes.map((action) => {
          // data set to hold the 'payload' of the returned observables
          const data = action.payload.doc.data() as ProductItems;
          // as data is now set to type of ProductItems, the id field can be returned
          data.id = action.payload.doc.id;
          // all data is returned
          return data;
        });
      })
    );
    //all items (garments) returned
    return this.items;
  }

  // get a particular garment held in a the 'product-items' collection - accepts parameter of id (string) - this will be the document ID
  getItem(id: string): Observable<ProductItems> {
    // setting itemDoc to equal the document in the collection where the parameter ID equals the document ID
    this.itemDoc = this.afs.doc<ProductItems>(`product-items/${id}`);
    // setting variable item to equal the itemDoc
    this.item = this.itemDoc.snapshotChanges().pipe(
      map((action) => {
        // if no item by that document id exists (where the 'payload' is null), then return a null value
        if (action.payload.exists === false) {
          return null;
        } else {
          // if a payload does exists, then set the constant data to the 'payload' values as type ProductItems
          const data = action.payload.data() as ProductItems;
          // setting the id of data to the document ID
          data.id = action.payload.id;
          // return the data
          return data;
        }
      })
    );
    // return the item where the payload id is equal to the parameter id
    return this.item;
  }

  // all of the above method logic applies to the remaining methods that deal with CRUD funactionality for the Fittings collections.
  // As different types of fittings are stored in different collections, variable names have been changed to accomdate this however all of the logic is the same
  // as the logic used in CRUD for garments

  // Methods relating to primary upper body fittings

  createAccessoriesUpper(accessory: Accessories) {
    this.accessoriesUpperCollection.add(accessory);
  }

  deleteAccessoriesUpper(accessory: Accessories) {
    this.accessoriesUpperDoc = this.afs.doc(
      `accessories-upper/${accessory.id}`
    );
    this.accessoriesUpperDoc.delete();
  }

  updateAccessoriesUpper(accessory: Accessories) {
    this.accessoriesUpperDoc = this.afs.doc(
      `accessories-upper/${accessory.id}`
    );
    this.accessoriesUpperDoc.update(accessory);
  }

  getAccessoriesUpper(): Observable<Accessories[]> {
    this.accessoryUpper = this.accessoriesUpperCollection
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((action) => {
            const data = action.payload.doc.data() as Accessories;
            data.id = action.payload.doc.id;
            return data;
          });
        })
      );
    return this.accessoryUpper;
  }

  getAccessoryUpper(id: string): Observable<Accessories> {
    this.accessoriesUpperDoc = this.afs.doc<Accessories>(
      `accessories-upper/${id}`
    );
    this.accessoryUpper = this.accessoriesUpperDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Accessories;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.accessoryUpper;
  }

  // Methods relating to secondary upper body fittings

  createAccessoriesItemsUpper(accessory: Accessories) {
    this.accessoriesItemsUpperCollection.add(accessory);
  }

  deleteAccessoriesItemsUpper(accessory: Accessories) {
    this.accessoriesItemsUpperDoc = this.afs.doc(
      `accessories-items-upper/${accessory.id}`
    );
    this.accessoriesItemsUpperDoc.delete();
  }

  updateAccessoriesItemsUpper(accessory: Accessories) {
    this.accessoriesItemsUpperDoc = this.afs.doc(
      `accessories-items-upper/${accessory.id}`
    );
    this.accessoriesItemsUpperDoc.update(accessory);
  }

  getAccessoriesItemsUpper(): Observable<Accessories[]> {
    this.accessoryItemsUpper = this.accessoriesItemsUpperCollection
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((action) => {
            const data = action.payload.doc.data() as Accessories;
            data.id = action.payload.doc.id;
            return data;
          });
        })
      );
    return this.accessoryItemsUpper;
  }

  getAccessoryItemUpper(id: string): Observable<Accessories> {
    this.accessoriesItemsUpperDoc = this.afs.doc<Accessories>(
      `accessories-items-upper/${id}`
    );

    this.accessoryItemsUpper = this.accessoriesItemsUpperDoc
      .snapshotChanges()
      .pipe(
        map((action) => {
          if (action.payload.exists === false) {
            return null;
          } else {
            const data = action.payload.data() as Accessories;
            data.id = action.payload.id;
            return data;
          }
        })
      );
    return this.accessoryItemsUpper;
  }
  // Methods relating to primary lower body fittings

  createAccessoriesLower(accessory: Accessories) {
    this.accessoriesLowerCollection.add(accessory);
  }

  deleteAccessoriesLower(accessory: Accessories) {
    this.accessoriesLowerDoc = this.afs.doc(
      `accessories-lower/${accessory.id}`
    );
    this.accessoriesLowerDoc.delete();
  }

  updateAccessoriesLower(accessory: Accessories) {
    this.accessoriesLowerDoc = this.afs.doc(
      `accessories-lower/${accessory.id}`
    );
    this.accessoriesLowerDoc.update(accessory);
  }

  getAccessoriesLower(): Observable<Accessories[]> {
    this.accessoriesLower = this.accessoriesLowerCollection
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((action) => {
            const data = action.payload.doc.data() as Accessories;
            data.id = action.payload.doc.id;
            return data;
          });
        })
      );
    return this.accessoriesLower;
  }

  getAccessoryLower(id: string): Observable<Accessories> {
    this.accessoriesLowerDoc = this.afs.doc<Accessories>(
      `accessories-lower/${id}`
    );

    this.accessoryLower = this.accessoriesLowerDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Accessories;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.accessoryLower;
  }

  // Methods relating to secondary lower body fittings

  createAccessoriesItemsLower(accessory: Accessories) {
    this.accessoriesItemsLowerCollection.add(accessory);
  }

  deleteAccessoriesItemsLower(accessory: Accessories) {
    this.accessoriesItemsLowerDoc = this.afs.doc(
      `accessories-items-lower/${accessory.id}`
    );
    this.accessoriesItemsLowerDoc.delete();
  }

  updateAccessoriesItemsLower(accessory: Accessories) {
    this.accessoriesItemsLowerDoc = this.afs.doc(
      `accessories-items-lower/${accessory.id}`
    );
    this.accessoriesItemsLowerDoc.update(accessory);
  }

  getAccessoriesItemsLower(): Observable<Accessories[]> {
    this.accessoriesItemsLower = this.accessoriesItemsLowerCollection
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((action) => {
            const data = action.payload.doc.data() as Accessories;
            data.id = action.payload.doc.id;
            return data;
          });
        })
      );
    return this.accessoriesItemsLower;
  }

  getAccessoryItemLower(id: string): Observable<Accessories> {
    this.accessoriesItemsLowerDoc = this.afs.doc<Accessories>(
      `accessories-items-lower/${id}`
    );
    this.accessoryItemsLower = this.accessoriesItemsLowerDoc
      .snapshotChanges()
      .pipe(
        map((action) => {
          if (action.payload.exists === false) {
            return null;
          } else {
            const data = action.payload.data() as Accessories;
            data.id = action.payload.id;
            return data;
          }
        })
      );
    return this.accessoryItemsLower;
  }
}
