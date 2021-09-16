import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap, map, first } from 'rxjs/operators';
import { UserDetails } from '../models/user-details';
import { UserMeasurements } from '../models/user-measurements';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  users: Observable<UserDetails[]> |any;
  userCollection: AngularFirestoreCollection<UserDetails> | any;
  user: Observable<UserDetails> | any;
  userDoc: AngularFirestoreDocument<UserDetails> | any;

  measurement: Observable<UserMeasurements> |any;
  measurementCollection: AngularFirestoreCollection<UserMeasurements> | any;
  measurements: Observable<UserMeasurements[]> | any;
 

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.measurementCollection = db.collection('user-measurements');
    this.userCollection = this.db.collection('user-details');
  }



  async createUserDetails(data: UserDetails) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('user-details').add({
      uid: user?.uid,
      email: user?.email,
    })
  }

  async createUserMeasurements(data: UserMeasurements){
    const user = await this.afAuth.currentUser;
    return this.db.collection('user-measurements').add({
      uid: user?.uid,
    })
  }

  deleteUserDetails(userId: string) {
    return this.db.collection('user-details').doc(userId).delete();
  }

  getUserDetails(): Observable<UserDetails[]> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        console.log(user);
        if (user) {
          return this.db
            .collection<UserDetails>('user-details', (ref) =>
              ref.where('email', '==', user.email)
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

  editUserDetails(userId: string, user: UserDetails) {
    this.db.collection('user-details').doc(userId).update(user);
  }

  editUserMeasurements(userId: string, measurements: UserMeasurements){
    this.db.collection('user-measurements').doc(userId).update(measurements);
    
  }

  

  getUserMeasurements(): Observable<UserMeasurements[]> {
    return this.afAuth.authState.pipe(
      switchMap((measurement) => {
        console.log(measurement);
        if (measurement) {
          return this.db
            .collection<UserMeasurements>('user-measurements', (ref) =>
              ref.where('uid', '==', measurement.uid)
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

  getById(measurement: UserMeasurements) {
    this.db
      .collection<UserMeasurements>('user-measurements')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {
              id,
              data,
            };
          });
        })
      )
      .subscribe();
  }

  getByUserDetailsId(details: UserDetails) {
    this.db
      .collection<UserDetails>('user-details')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {
              id,
              data,
            };
          });
        })
      )
      .subscribe();
  }

  public getUserDetailsByUid(uid: String): Observable<UserDetails[]> {
    console.log(uid);
    return this.db
      .collection<UserDetails>('user-details', (ref) => ref.where('uid', '==', uid))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const userDetails: UserDetails = a.payload.doc.data();
            return userDetails;
          })
        })
      )
     
  }

  public getUserMeasurementsByUid(uid: String): Observable<UserMeasurements[]> {
    console.log(uid);
    return this.db
      .collection<UserMeasurements>('user-measurements', (ref) => ref.where('uid', '==', uid))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const userMeasurements: UserMeasurements = a.payload.doc.data();
            return userMeasurements;
          })
        })
      )
     
  }
}
