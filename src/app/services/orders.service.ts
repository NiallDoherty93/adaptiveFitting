import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/user-details';
import { Order } from '../models/order';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';

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
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.ordersCollection = this.db.collection('orders');
  }

  async placeOrder(order: any) {
    const user = await this.afAuth.currentUser;

    this.db.collection('orders').add({
      ...order,
      uid: user?.uid,
    });

    this.shoppingCartService.clearCart();
  }

  public getOrdersByUser(userId: string) {
    return this.db.collection('orders', (ref) =>
      ref.where('uid', '==', userId)
    );
  }

  private getOrderId(route: ActivatedRoute) {
    return route.paramMap.pipe(
      map((p) => {
        return p.get('id');
      })
    );
  }

  getOrders(): Observable<Order[]> {
    this.orders = this.ordersCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as Order;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
    return this.orders;
  }

  getOrder(id: string): Observable<Order> {
    this.orderDoc = this.db.doc<Order>(`orders/${id}`);

    this.order = this.orderDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Order;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.order;
  }

  getUserOrder(): Observable<Order[]> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        console.log(user);
        if (user) {
          return this.db
            .collection<Order>('orders', (ref) =>
              ref.where('uid', '==', user.uid)
            )
            .valueChanges({
              idField: 'id',
            });
        } else {
          return [];
        }
      })
    );
  }

  deleteOrder(order: Order){
    this.orderDoc = this.db.doc(`orders/${order.id}`);
    this.orderDoc.delete()
  }
}
