import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import 'firebase/auth';
import 'firebase/firestore';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;
  loggedInUserUid: string;
  isUserAdmin: boolean;
  isUserTailor: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessagesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // getting the auth state of the user
    this.authService.getAuth().subscribe((auth) => {
      // if an auth state exists
      if (auth) {
        // setting isLoggedIn to true - this can then be used as an auth guard in the html
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
        this.loggedInUserUid = auth.uid;
        // getting the user roles - eg: is the user an admin
        this.getUserRoles();
      } else {
        // else they are not logged in
        this.isLoggedIn = false;
      }
    });
  }

  // getting the roles for each user
  private getUserRoles(): void {
    // getting the uid of the logged in user and setting it as a parameter for getUserRolesByUid
    this.userService
      .getUserRolesByUid(this.loggedInUserUid)
      .subscribe((userRoles) => {
        // user roles retunred as an observable. If user roles returns true (user roles for that user exist in the server)
        if (userRoles) {
          // user roles retunred as an array, isUserAdmin & isUserTailor set to first array where the role is admin or tailor
          this.isUserAdmin = userRoles[0].roles.admin;
          this.isUserTailor = userRoles[0].roles.tailor;
        }
      });
  }

  //handling the logout process
  onLogoutClick() {
    this.authService.logout();
    this.flashMessageService.show('You are now logged out', {
      cssClass: 'alert-success',
      timeout: FLASH_MESSAGE_TIMEOUT,
    });
    this.router.navigate(['/login']);
  }
}
