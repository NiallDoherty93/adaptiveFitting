import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';
import { UserDetails } from 'src/app/models/user-details';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-details-client',
  templateUrl: './admin-details-client.component.html',
  styleUrls: ['./admin-details-client.component.css'],
})
export class AdminDetailsClientComponent implements OnInit {
  id: string | any;
  user: UserDetails | any;
  role: UserDetails;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    //get id from url to use for parameter in the getUserDetailsByUid() method called from the user service
    this.id = this.route.snapshot.params['id'];
    //get user by ID held in the url
    this.userService.getUserDetailsByUid(this.id).subscribe((user) => {
      // user details returned as an array, getting first value of array
      this.user = user[0];
    });
  }

  onDeleteClick() {
    // delete confimation pop up activator
    if (confirm('Are you sure?')) {
      // passing in the uid of the user to be deleted - identifed by the details recived in the ngOnInit()
      this.userService.deleteUser(this.user.uid);
      // success message shown if user deleted successfully - use of global variables
      this.flashMessage.show('User Removed', {
        cssClass: 'alert-success',
        timeout: FLASH_MESSAGE_TIMEOUT,
      });
      // navigation once action is complete
      this.router.navigate(['/admin/clients']);
    }
  }
}
