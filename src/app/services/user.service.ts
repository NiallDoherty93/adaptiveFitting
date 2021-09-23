import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap, map, first } from 'rxjs/operators';
import { Roles } from '../models/roles';
import { UserDetails } from '../models/user-details';
import { UserMeasurements } from '../models/user-measurements';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  roles: Roles

  
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

  deleteUser(userId: string) {
    this.db.collection('user-details')
      .snapshotChanges()
      .pipe(map(allDocuments => {
        // Loop over all the documents in the user details collection in a map
        return allDocuments.map(doc => {
          // Store the values for the current document
          const data: UserDetails = doc.payload.doc.data();
          // Store the id of the current document being checked
          const id: string = doc.payload.doc.id;
          // Check the uid field for the current doc if it matched the uid of the user passed into the method
          if (userId !== data.uid) {
            return;
          } else {
            // If a match is found (should be only one) - return the id of the document
            return { id }
          }
        })
      })).subscribe(docIds => {
        if (docIds) {
          // loop over all the returned doc ids (only one will not be undefined)
          docIds.forEach(docId => {
            // Check each doc id - look for the one that's not undefined
            if (docId) {
              // when not undefined doc id found - delete this document
              this.userDoc = this.db.doc(`user-details/${docId.id}`);
              this.userDoc.delete();
            }
          })
        }
      });
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
    console.log(uid);
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

  makeUserAdmin(userId: string, user: UserDetails) {
    this.db.collection('user-roles').doc(userId).update({
      "roles.admin": true
    })
  }

  makeUserTailor(userId: string, user: UserDetails) {
    this.db.collection('user-roles').doc(userId).update({
      "roles.tailor": true
    })
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
