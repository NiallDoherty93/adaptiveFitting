import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserMeasurements } from 'src/app/models/user-measurements';
import { AuthService } from 'src/app/services/auth.service';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';

@Component({
  selector: 'app-user-measurements',
  templateUrl: './user-measurements.component.html',
  styleUrls: ['./user-measurements.component.css'],
})
export class UserMeasurementsComponent implements OnInit {
  measurements: UserMeasurements;
  userId: string | any;

  constructor(
    private flashMessageService: FlashMessagesService,
    private userService: UserService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // getting auth state of user
    this.auth.getAuth().subscribe((userAuth) => {
      // returning details of that user as an array = assigning userId to the uid value in the array
      this.userId = userAuth?.uid[0];
      // if the userId id present
      if (this.userId) {
        // get thw users measaurments
        this.userService.getUserMeasurements().subscribe((measurement) => {
          this.measurements = measurement[0];
        });
      }
    });
  }
  // called when user submits form
  onSubmitAddMeasurements({ value, valid }: NgForm) {
    if (!valid) {
      this.flashMessageService.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: FLASH_MESSAGE_TIMEOUT,
      });
    } else {
      // if values are valid then edit the users details - note even if user adds measurments for the first time, edit is still called because the
      //user measurements document was created during the registration process
      this.userService.editUserMeasurements(
        this.measurements.id,
        this.measurements
      );
      if (!this.measurements) {
        //
        this.flashMessageService.show('Details added successfully!', {
          cssClass: 'alert-success',
          timeout: FLASH_MESSAGE_TIMEOUT,
        });
        this.router.navigate(['/profile']);
      } else {
        this.flashMessageService.show('Details edited successfully!', {
          cssClass: 'alert-success',
          timeout: FLASH_MESSAGE_TIMEOUT,
        });
        this.router.navigate(['/profile']);
      }
    }
  }
}
