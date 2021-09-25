import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/models/user-details';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserDetails | any;
  userId: string | any

  constructor(
    private userService: UserService,
    private auth: AuthService,
    
  ) { }

  ngOnInit(): void {
    // checking auth status of user to see if they are logged in
    this.auth.getAuth().subscribe(userAuth => {
      // if user exists, set userId to the returned users uid in the array
      this.userId = userAuth?.uid[0]
      // if the userId exists (it always will)
      if(this.userId){
         //get all the details of that user
        this.userService.getUserDetails().subscribe(user =>{
          this.user = user[0];
        })
      } 
    }) ;
  }

}
