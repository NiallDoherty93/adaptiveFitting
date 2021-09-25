import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { UserDetails } from 'src/app/models/user-details';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';
import { Roles } from 'src/app/models/roles';

@Component({
  selector: 'app-admin-permissions-client',
  templateUrl: './admin-permissions-client.component.html',
  styleUrls: ['./admin-permissions-client.component.css'],
})
export class AdminPermissionsClientComponent implements OnInit {
  id: string;
  user: UserDetails;
  isAdmin: boolean;
  isTailor: boolean;
  userRoles: Roles;
  value: Roles;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flashMessageService: FlashMessagesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    //get document id  from url - this is also the users uid - this rule is particular to user roles
    this.id = this.route.snapshot.params['id'];
    //get user from id in url
    this.userService.getUserRolesByUid(this.id).subscribe((user) => {
      // user returned as an array - set user to equal first array
      this.user = user[0];
    });
  }

  onSubmit({ value, valid }: NgForm) {
    this.id = this.route.snapshot.params['id'];
    // invlaid form handler
    if (!valid) {
      //show error
      this.flashMessageService.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: FLASH_MESSAGE_TIMEOUT,
      });
    } else {
      // switch statement to handle user input from dropdown in HTML
      switch (this.user) {
        case 'Make Admin': {
          // if admin wants to make another user admin, call "makeUserAdmin" method from user service and populate it with the documnet ID(the UID of the user)
          // also populate method with the user details
          this.userService.makeUserAdmin(this.id, this.user);
          // navigate back to all clients
          this.router.navigate(['/admin/clients']);
          // success message with use of global constants
          this.flashMessageService.show(
            'Administrator permissions granted successfully',
            {
              cssClass: 'alert-success',
              timeout: FLASH_MESSAGE_TIMEOUT,
            }
          );
          break;
        }
        case 'Make Tailor': {
          // if admin wants to make another user tailor, call "makeUserTailor" method from user service and populate it with the documnet ID(the UID of the user)
          // also populate method with the user details
          this.userService.makeUserTailor(this.id, this.user);
          // navigate back to all clients
          this.router.navigate(['/admin/clients']);
          // success message with use of global constants
          this.flashMessageService.show(
            'Tailor permissions granted successfully',
            {
              cssClass: 'alert-success',
              timeout: FLASH_MESSAGE_TIMEOUT,
            }
          );
          break;
        }
      }
    }
  }
}
