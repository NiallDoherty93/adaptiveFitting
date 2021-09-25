import { Component, OnInit} from '@angular/core';
import {NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/models/user-details';
import { AuthService } from 'src/app/services/auth.service';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';

@Component({
  selector: 'app-add-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class AddUserDetailsComponent implements OnInit {
  detailsExist: boolean | any = true;
  user: UserDetails;
  userId: string | any;

  userDetails: UserDetails = {
    uid: '',
    address: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    postcode: '',
  };

  constructor(
    private flashMessageService: FlashMessagesService,
    private userService: UserService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    //getting logged in user
    this.auth.getAuth().subscribe((userAuth) => {
      // observable returned as an array - getting user uid from array,
      this.userId = userAuth?.uid[0];
      // if uid exists (it always will)
      if (this.userId) {
        // get user details
        this.userService.getUserDetails().subscribe((user) => {
          this.user = user[0];
        });
      }
    });
  }

  onSubmitAdd({ value, valid }: NgForm) {
    if (!valid) {
      // error handler to ensure from filled out correctly
      this.flashMessageService.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        // use of global variable for message time
        timeout: FLASH_MESSAGE_TIMEOUT,
      });
    } else {
      // updating user details
      this.userService.editUserDetails(this.user.id, this.user);
      // assigning default user roles - admin = false, tailor = false
      this.auth.updateUserData(this.user);
      if (!this.user) {
        this.flashMessageService.show('Details updated successfully!', {
          cssClass: 'alert-success',
          timeout: FLASH_MESSAGE_TIMEOUT,
        });
      } else {
        this.flashMessageService.show('Details updated successfully!', {
          cssClass: 'alert-success',
          timeout: FLASH_MESSAGE_TIMEOUT,
        });
      }

      this.router.navigate(['/profile']);

    }
  }
}
