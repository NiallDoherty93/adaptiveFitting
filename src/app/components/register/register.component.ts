import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';
import { UserDetails } from 'src/app/models/user-details';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;
  uid: string;
  user: UserDetails;
 

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    // if password and confirm password fields match
    if (this.password === this.confirmPassword) {
      // calling register method from authService, accepting parameters of the email and password inputted by the user
      this.authService
        .register(this.email, this.password)
        .then((res) => {
          // once user presses submit and details valid, the UID created is added to 2 newe tables in the server - user-details and user-measurments
          this.userService.createUserDetails({ email: this.email });
          this.userService.createUserMeasurements({ uid: this.uid });
          // success message when registered in
          this.flashMessage.show('You are now registered and logged in', {
            cssClass: 'alert-success',
            timeout: FLASH_MESSAGE_TIMEOUT,
          });
          // directed to the user dashboard
          this.router.navigate(['/dashboard']);
        })
        .catch((err) => {
          // if email formatted incorrectly
          this.flashMessage.show(err.message, {
            cssClass: 'alert-danger',
            timeout: FLASH_MESSAGE_TIMEOUT,
          });
        });
    } else {
      // if passwords dont match
      this.flashMessage.show('Passwords dont match', {
        cssClass: 'alert-danger',
        timeout: FLASH_MESSAGE_TIMEOUT,
      });
    }
  }
}
