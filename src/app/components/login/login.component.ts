import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string | any;
  password: string | any;
  role: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    // calling getAuth from auth service to check the auth state of the user
    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        // if the auth state returns, user is directed to dashboard
        this.router.navigate(['/dashboard']);
      }
    });
  }

  // calling login method from auth service, checking to see if user password and username are held in the server
  onSubmit() {
    this.authService
      .login(this.email, this.password)
      .then((res) => {
        // success message if user logs in successfully
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: FLASH_MESSAGE_TIMEOUT,
        });
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
        // error message displayed if login failed
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger',
          timeout: FLASH_MESSAGE_TIMEOUT,
        });
      });
  }
}
