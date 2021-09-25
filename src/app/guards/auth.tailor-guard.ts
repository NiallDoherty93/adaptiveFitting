import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TailorAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  // canActivate directive used
  canActivate(): Observable<boolean> {
    // calls user$ observable from the auth service
    return this.authService.user$.pipe(
      take(1),
      //pipes that value to a “map” which omits the value as an observable called “user”
      //using a ternary operator on this observable, a determination on weather or not tailor is set to true or false can be made.
      map((user) => (user && user.roles.tailor ? true : false)),
      tap((isTailor) => {
        // if not a tailor, do not navigate
        if (!isTailor) {
          this.router.navigate(['/']);
          // if a tailor, navigate
        } else if (isTailor) {
          return true;
        }
      })
    );
  }
}
