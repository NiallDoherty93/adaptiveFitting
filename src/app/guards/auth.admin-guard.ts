import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  // canActivate directive used
  canActivate(): Observable<boolean> {
    // calls user$ observable from the auth service
    return this.authService.user$.pipe(
      take(1),
      //pipes that value to a “map” which omits the value as an observable called “user”
      //using a ternary operator on this observable, a determination on weather or not admin is set to true or false can be made.
      map((user) => (user && user.roles.admin ? true : false)),
      tap((isAdmin) => {
        // if not an admin, do not navigate
        if (!isAdmin) {
          this.router.navigate(['/']);
          // if an admin, navigate
        } else if (isAdmin) {
          return true;
        }
      })
    );
  }
}
