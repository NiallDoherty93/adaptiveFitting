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
import { AuthService } from './auth.service';

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
 

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private authService: AuthService) {
    this.measurementCollection = db.collection('user-measurements');
    this.userCollection = this.db.collection('user-details'
    );
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

  // deleteUserDetails(userId: string) {
  //   return this.db.collection('user-details').doc(userId).delete();
  // }

  deleteUser(user: UserDetails){
    this.userDoc = this.db.doc(`user-details/${user.id}`);
    this.userDoc.delete()
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


  public getUserDetailsByUid(uid: String): Observable<UserDetails[]> {
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

  public getUserRolesByUid(uid: String) : Observable<UserDetails[]>{
    return this.db
    .collection<UserDetails>('user-roles', (ref) => ref.where('uid', '==', uid))
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

  makeUserAdmin(userId: string, user: UserDetails, isAdmin: boolean) {
    this.db.collection('user-roles').doc(userId).update(user.roles.admin ===true);
    
  }

  makeUserTailor(userId: string, user: UserDetails, isTailor: boolean) {
    this.db.collection('user-roles').doc(userId).update(user.roles.tailor ===true);
    
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

  getAllUsers(): Observable<UserDetails[]> {
    this.users = this.userCollection.snapshotChanges().pipe(
    map(changes => {
      //@ts-ignore
      return changes.map(action => {
        const data = action.payload.doc.data() as UserDetails;
        data.id = action.payload.doc.id;
        return data;
        
      });
    }));
    return this.users;
    
  }


}
