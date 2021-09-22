import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDetails } from 'src/app/models/user-details';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.css']
  ,   template: `
<div>
  <ngx-datatable [rows]="rows" [columns]="columns"> </ngx-datatable>
</div>
`
})
export class AdminClientsComponent implements OnInit {
  users: UserDetails[]=[]
  subscription: Subscription|any;
  filteredUsers: UserDetails[]=[]

  constructor(private userService: UserService) {
    this.subscription= this.userService.getAllUsers().subscribe(users=> this.filteredUsers= this.users = users)
   }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users
      console.log(this.users);
    });
  }
  
  filter(query: string){
    this.filteredUsers=(query)?
    this.users.filter(p => p.email?.toLowerCase().includes(query.toLowerCase())) :
    this.users;
  }

}
