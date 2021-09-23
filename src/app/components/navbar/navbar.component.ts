import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router} from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';
import { UserDetails } from 'src/app/models/user-details';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean | any;
  loggedInUser: string | any;
  showRegister: boolean | any;
  loggedInUserUid: string;
  isUserAdmin: boolean;
  isUserTailor: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessagesService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn=true;
        this.loggedInUser = auth.email;
        this.loggedInUserUid = auth.uid;
        this.getUserRoles();
      } else {
        this.isLoggedIn=false
      }
    });
  }

  private getUserRoles(): void {
    this.userService.getUserRolesByUid(this.loggedInUserUid).subscribe(userRoles => {
      if (userRoles) {
        this.isUserAdmin = userRoles[0].roles.admin;
        this.isUserTailor = userRoles[0].roles.tailor;
      }
    })
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessageService.show('You are now logged out',{
      cssClass: 'alert-success', timeout:FLASH_MESSAGE_TIMEOUT
    });
    this.router.navigate(['/login'])
  }
}
