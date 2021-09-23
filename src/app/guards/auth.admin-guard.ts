import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserDetails } from '../models/user-details';

@Injectable()
export class AdminAuthGuard implements CanActivate {
 
  constructor(private router: Router, private authService: AuthService) {}
 
  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user) => (user && user.roles.admin ? true : false)),
      tap((isAdmin) => {
        if (!isAdmin) {
          this.router.navigate(['/']);
        } else if (isAdmin) {
          return true;
        }
      })
    );
  }
}
