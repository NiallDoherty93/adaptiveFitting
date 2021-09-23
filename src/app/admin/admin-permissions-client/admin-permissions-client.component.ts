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
    //get id from url
    this.id = this.route.snapshot.params['id'];
    //get product
    this.userService.getUserRolesByUid(this.id).subscribe((user) => {
      this.user = user[0];
      console.log(user);
    });
  }

  onSubmit({ value, valid }: NgForm) {
    this.id = this.route.snapshot.params['id'];
    if (!valid) {
      //show error
      this.flashMessageService.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: FLASH_MESSAGE_TIMEOUT,
      });
    } else {
      switch (this.user) {
        case 'Make Admin': {
          this.userService.makeUserAdmin(this.id, this.user);
          this.router.navigate(['/admin/clients']);
          this.flashMessageService.show('Administrator permissions granted successfully', {
            cssClass: 'alert-success',
            timeout: FLASH_MESSAGE_TIMEOUT,
          });
          break;
        }
        case "Make Tailor": {
          this.userService.makeUserTailor(this.id, this.user);
          this.router.navigate(['/admin/clients']);
          this.flashMessageService.show('Tailor permissions granted successfully', {
            cssClass: 'alert-success',
            timeout: FLASH_MESSAGE_TIMEOUT,
          });
          break;
        }
      }
    }
  }
}
