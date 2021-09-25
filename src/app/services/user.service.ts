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
  roles: Roles;

  users: Observable<UserDetails[]> | any;
  userCollection: AngularFirestoreCollection<UserDetails> | any;
  user: Observable<UserDetails> | any;
  userDoc: AngularFirestoreDocument<UserDetails> | any;

  measurement: Observable<UserMeasurements> | any;
  measurementCollection: AngularFirestoreCollection<UserMeasurements> | any;
  measurements: Observable<UserMeasurements[]> | any;

  // setting measurementCollection as 'user-measurements' collection in the server
  // setting userCollection as 'user-details' collection in the server
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private authService: AuthService
  ) {
    this.measurementCollection = db.collection('user-measurements');
    this.userCollection = this.db.collection('user-details');
  }

  // creating the user details
  async createUserDetails(data: UserDetails) {
    // setting user to logged in user
    const user = await this.afAuth.currentUser;
    return this.userCollection.add({
      // adding the uid and email to the 'user-details' collection
      uid: user?.uid,
      email: user?.email,
    });
  }

  // creating the user measurements collection
  async createUserMeasurements(data: UserMeasurements) {
    // setting user to logged in user
    const user = await this.afAuth.currentUser;
    return this.measurementCollection.add({
      // adding the uid to measurementCollection
      uid: user?.uid,
    });
  }

  deleteUser(userId: string) {
    this.db
      .collection('user-details')
      .snapshotChanges()
      .pipe(
        map((allDocuments) => {
          // Loop over all the documents in the user details collection in a map
          return allDocuments.map((doc) => {
            // Store the values for the current document
            const data: UserDetails = doc.payload.doc.data();
            // Store the id of the current document being checked
            const id: string = doc.payload.doc.id;
            // Check the uid field for the current doc if it matched the uid of the user passed into the method
            if (userId !== data.uid) {
              return;
            } else {
              // If a match is found (should be only one) - return the id of the document
              return { id };
            }
          });
        })
      )
      .subscribe((docIds) => {
        if (docIds) {
          // loop over all the returned doc ids (only one will not be undefined)
          docIds.forEach((docId) => {
            // Check each doc id - look for the one that's not undefined
            if (docId) {
              // when not undefined doc id found - delete this document
              this.userDoc = this.db.doc(`user-details/${docId.id}`);
              this.userDoc.delete();
            }
          });
        }
      });
  }

  // editing user details
  editUserDetails(userId: string, user: UserDetails) {
    // editing where the document in the userCollection contains the uid of the user passed as a paramter into the method
    this.userCollection.doc(userId).update(user);
  }

  editUserMeasurements(userId: string, measurements: UserMeasurements) {
    // editing where the document in the measurementCollection contains the uid of the user passed as a paramter into the method
    this.measurementCollection.doc(userId).update(measurements);
  }
  //get the users details by thier uid - takes in uid of type string, returns an observable of type UserDetails[]
  public getUserDetailsByUid(uid: String): Observable<UserDetails[]> {
    // call to collection where the uid of the user is equal to the uid held in the document
    return this.db
      .collection<UserDetails>('user-details', (ref) =>
        ref.where('uid', '==', uid)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            //assigns userDetails as the payload of the document (all values)
            const userDetails: UserDetails = a.payload.doc.data();
            // returns the user details as an observable
            return userDetails;
          });
        })
      );
  }
  //get the users measurements by thier uid - takes in uid of type string, returns an observable of type UserMeasurements[]
  public getUserMeasurementsByUid(uid: String): Observable<UserMeasurements[]> {
    // call to collection where the uid of the user is equal to the uid held in the document
    return this.db
      .collection<UserMeasurements>('user-measurements', (ref) =>
        ref.where('uid', '==', uid)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            //assigns userMeasurements as the payload of the document (all values)
            const userMeasurements: UserMeasurements = a.payload.doc.data();
            // returns the userMeasurements as an observable
            return userMeasurements;
          });
        })
      );
  }

  // gets user measurments for logged in user
  getUserMeasurements(): Observable<UserMeasurements[]> {
    // returns the auth state of the user
    return this.afAuth.authState.pipe(
      // loops through all user measurment documents
      switchMap((measurement) => {
        // if the measurments exist
        if (measurement) {
          // return the document where the uid of the logged in user is equal to the uid in the document
          return this.db
            .collection<UserMeasurements>('user-measurements', (ref) =>
              ref.where('uid', '==', measurement.uid)
            )
            .valueChanges({
              idField: 'id',
            });
        } else {
          // if no values found, return an empty array
          return [];
        }
      })
    );
  }
  // gets user details for logged in user
  getUserDetails(): Observable<UserDetails[]> {
    // returns the auth state of the user
    return this.afAuth.authState.pipe(
      // loops through all user details documents
      switchMap((user) => {
        // if the user details exist
        if (user) {
          // return the document where the uid of the logged in user is equal to the uid in the document
          return this.db
            .collection<UserDetails>('user-details', (ref) =>
              ref.where('email', '==', user.email)
            )
            .valueChanges({
              idField: 'id',
            });
        } else {
          // if no values found, return an empty array
          return [];
        }
      })
    );
  }

  // giving the user admin permissions - takes parameter of userId - the uid and user of type UserDetails
  makeUserAdmin(userId: string, user: UserDetails) {
    // calling the collection where the document id is equal to the uid of the user
    // when the 'user-roles' collection is created, the document ID's are set to the uid of the user they apply to
    this.db.collection('user-roles').doc(userId).update({
      // setting the admin role to true as its defaulted to false
      'roles.admin': true,
    });
  }
  // giving the user tailor permissions - takes parameter of userId - the uid and user of type UserDetails
  makeUserTailor(userId: string, user: UserDetails) {
    // calling the collection where the document id is equal to the uid of the user
    // when the 'user-roles' collection is created, the document ID's are set to the uid of the user they apply to
    this.db.collection('user-roles').doc(userId).update({
      // setting the tailor role to true as its defaulted to false
      'roles.tailor': true,
    });
  }

  //get the users roles by thier uid - takes in uid of type string, returns an observable of type UserDetails[]
  public getUserRolesByUid(uid: String): Observable<UserDetails[]> {
    // call to collection where the uid of the user is equal to the uid held in the document
    return this.db
      .collection<UserDetails>('user-roles', (ref) =>
        ref.where('uid', '==', uid)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            //assigns UserDetails as the payload of the document (all values)
            const userDetails: UserDetails = a.payload.doc.data();
            // returns the user details as an observable - these values will be the user roles as they are of type userDetails
            return userDetails;
          });
        })
      );
  }

  // get all users held in the server
  getAllUsers(): Observable<UserDetails[]> {
    // returns the data held in userCollection - defined in the constructor
    this.users = this.userCollection.snapshotChanges().pipe(
      map((changes) => {
        //@ts-ignore
        return changes.map((action) => {
          // setting const data to the payload of the returned values
          const data = action.payload.doc.data() as UserDetails;
          // setting the data =.id to the document ID
          data.id = action.payload.doc.id;
          // returning the data
          return data;
        });
      })
    );
    // returning all users
    return this.users;
  }
}
