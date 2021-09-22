import { Injectable } from '@angular/core';
import {
  CanActivate,
} from '@angular/router';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TailorAuthGuard implements CanActivate {
 
  constructor(private router: Router, private authService: AuthService) {}
 
  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user) => (user && user.roles.tailor ? true : false)),
      tap((isTailor) => {
        if (!isTailor) {
          this.router.navigate(['/']);
        } else if (isTailor) {
          return true;
        }
      })
    );
  }
}