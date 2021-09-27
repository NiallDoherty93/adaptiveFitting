import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserDetails } from '../models/user-details';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<UserDetails>;

  constructor(
    public firebaseAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    // setting obserable user to the current authstate of the user
    this.user$ = this.firebaseAuth.authState.pipe(
      //looping through returned users
      switchMap((user) => {
        // if there is a user
        if (user) {
          // return the document of user-roles in the server where the document ID is equal to the UID of the current user
          return this.db
            .doc<UserDetails>(`user-roles/${user.uid}`)
            .valueChanges();
        } else {
          // if no user return null
          return of(null);
        }
      })
    );
  }
  // method used to log a user in, accepts parameters of email and password of type string
  public login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      // using AngularFireAuth directive signInWithEmailAndPassword with the paramaters of email and password
      this.firebaseAuth.signInWithEmailAndPassword(email, password).then(
        // resolve this data to the user creditials stored in the server
        (userData) => resolve(userData),
        // rejection if credientials dont match
        (err) => reject(err)
      );
    });
  }

  // get the auth state of a user
  getAuth() {
    return this.firebaseAuth.authState.pipe((auth) => auth);
  }
  // logout using AngularFireAuth directive signOut()
  logout() {
    this.firebaseAuth.signOut();
  }

  // registering a new user, parameters of email and password of type string
  public register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      // using AngularFireAuth directive createUserWithEmailAndPassword and passing in the email and password
      this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(
        // set new data in the server
        (userDate) => resolve(userDate),
        (err) => reject(err)
      );
    });
  }

  // setting/ updating user roles eg: admin or tailor
  public updateUserData(user: UserDetails) {
    // Sets userRef to firestore document in collection 'user-roles' - the uid of the user will be stored and set to equal the document ID
    const userRef: AngularFirestoreDocument<any> = this.db.doc(
      `user-roles/${user.uid}`
    );
    // data to be sent to 'user-roles' collection
    const data: UserDetails = {
      uid: user.uid,
      email: user.email,
      roles: {
        user: true,
        admin: false,
        tailor: false,
      },
    };
    // returns the userRef value, sets the document ID to the UID and adds the values 'data' to the document in the collection
    return userRef.set(data, { merge: true });
  }
}
