import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
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
    private db: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.firebaseAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .doc<UserDetails>(`user-roles/${user.uid}`)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  public login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.signInWithEmailAndPassword(email, password).then(
        (userData) => resolve(userData),
        (err) => reject(err)
      );
    });
  }

  public checkRole(role: UserDetails, email: string, password: string){
    if(role.roles.admin===true){
      this.login(email, password)
      this.router.navigate(['/admin/dash'])
    }else if (role.roles.tailor===true){
      this.login(email, password)
      this.router.navigate(['/tailor/orders'])
    }else{
      this.login(email, password)
      this.router.navigate(['/dashboard'])
    }
    
  }

  getAuth() {
    return this.firebaseAuth.authState.pipe((auth) => auth);
  }

  logout() {
    this.firebaseAuth.signOut();
  }
  public register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(
        (userDate) => resolve(userDate),
        (err) => reject(err)
      );
    });
  }

  public updateUserData(user: UserDetails) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.db.doc(
      `user-roles/${user.uid}`
    );
    const data: UserDetails = {
      uid: user.uid,
      email: user.email,
      roles: {
        user: true,
        admin: false,
        tailor: false,
      },
    };
    return userRef.set(data, { merge: true });
  }

  canDelete(user: UserDetails): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  public checkAuthorization(
    user: UserDetails,
    allowedRoles: string[]
  ): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

  
}
