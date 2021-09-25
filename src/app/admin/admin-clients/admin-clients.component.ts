import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDetails } from 'src/app/models/user-details';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.css'],
  template: `
    <div>
      <ngx-datatable [rows]="rows" [columns]="columns"> </ngx-datatable>
    </div>
  `,
})
export class AdminClientsComponent implements OnInit {
  users: UserDetails[] = [];
  subscription: Subscription | any;
  filteredUsers: UserDetails[] = [];

  constructor(private userService: UserService) {
    // assigning all users to filtered users for search function
    this.subscription = this.userService
      .getAllUsers()
      .subscribe((users) => (this.filteredUsers = this.users = users));
  }

  ngOnInit(): void {
    // getAllUsers() called from the user service file, under the folder services. Gets all users from the server
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }
  // search function accepts parameter of type string - this is the users input
  filter(query: string) {
    this.filteredUsers = query
      ? // using filter directive to search by email and set values to lower case to avoid errors
        this.users.filter((p) =>
          p.email?.toLowerCase().includes(query.toLowerCase())
        )
      : this.users;
  }
}
