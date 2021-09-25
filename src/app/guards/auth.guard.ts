import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}
  // canActivate directive used
  canActivate(): Observable<boolean> {
    // returns the authenticated state of the user
    return this.afAuth.authState.pipe(
      map((auth) => {
        //if the user is not authenticated, do not navigate and return false
        if (!auth) {
          this.router.navigate(['']);
          return false;
        } else {
          // return true if user is authenticated
          return true;
        }
      })
    );
  }
}
