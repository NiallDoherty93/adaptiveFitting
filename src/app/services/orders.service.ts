import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/user-details';
import { Order } from '../models/order';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  user: Observable<UserDetails> | any;

  ordersCollection!: AngularFirestoreCollection<Order>;
  orderDoc!: AngularFirestoreDocument<Order>;
  orders!: Observable<Order[]>;
  order: Observable<Order> | any;

  constructor(
    private db: AngularFirestore,
    private shoppingCartService: ShoppingCartService,
    private afAuth: AngularFireAuth
  ) {
    //setting ordersCollection to the collection 'orders' in the server
    this.ordersCollection = this.db.collection('orders');
  }
  // placing the order - accepts parameter of 'any'
  async placeOrder(order: any) {
    // user is set to equal the logged in user
    const user = await this.afAuth.currentUser;
    // adding order to the 'orders' collection
    this.ordersCollection.add({
      ...order,
      // adding the users 'uid' to the 'orders' collection
      uid: user?.uid,
    });
    // calling the clearCart method from the shoppingCartService, this will clear the shopping cart after the order us placed
    this.shoppingCartService.clearCart();
  }

  // getting all orders in the ordersCollection - defined in the constructor, returns an observable of type Order
  getOrders(): Observable<Order[]> {
    // setting orders variable to equal all the orders stored in the server in that given collection
    this.orders = this.ordersCollection.snapshotChanges().pipe(
      // map applies a given project function to each value emitted by the source Observable, and emits the resulting values as an Observable.
      map((changes) => {
        // map used again to calls a defined callback function on each element of an array, and returns an array that contains the results.
        return changes.map((action) => {
          // data set to hold the 'payload' of the returned observables
          const data = action.payload.doc.data() as Order;
          // as data is now set to type of Order, the id field can be returned
          data.id = action.payload.doc.id;
          // all data is returned
          return data;
        });
      })
    );
    //all items (orders) returned
    return this.orders;
  }

  // get a particular order held in a the 'orders' collection - accepts parameter of id (string) - this will be the document ID
  getOrder(id: string): Observable<Order> {
    // setting orderDoc to equal the document in the collection where the parameter ID equals the document ID
    this.orderDoc = this.db.doc<Order>(`orders/${id}`);
    // setting order item to equal the orderDoc
    this.order = this.orderDoc.snapshotChanges().pipe(
      map((action) => {
        // if no order by that document id exists (where the 'payload' is null), then return a null value
        if (action.payload.exists === false) {
          return null;
        } else {
          // if a payload does exists, then set the constant data to the 'payload' values as type 'Order'
          const data = action.payload.data() as Order;
          // setting the id of data to the document ID
          data.id = action.payload.id;
          // return the data
          return data;
        }
      })
    );
    // return the order where the payload id is equal to the parameter id
    return this.order;
  }

  //lets logged in user see their orders
  getUserOrder(): Observable<Order[]> {
    // returns the currently logged in user
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        // if user exists
        if (user) {
          // returns the documents in the collection where the users uid matches the uid in the order
          return this.db
            .collection<Order>('orders', (ref) =>
              ref.where('uid', '==', user.uid)
            )
            // optional - passing the id of the document into the id field inside the document,
            // allows order details to be displayed by calling the id field inside the document 
            .valueChanges({
              idField: 'id',
            });
          // if no documents, return an empty array
        } else {
          return [];
        }
      })
    );
  }

  // deleting an order - parameter order of type 'Order' - this interface hold a value called 'id' - refering to the document ID
  deleteOrder(order: Order) {
    // setting orderDoc to equal the document to be deleted
    this.orderDoc = this.db.doc(`orders/${order.id}`);
    this.orderDoc.delete();
  }
}
