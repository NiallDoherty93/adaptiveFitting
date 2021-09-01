import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/models/user-details';
import { AuthService } from 'src/app/services/auth.service';
import { UserMeasurements } from 'src/app/models/user-measurements';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserDetails | any;
  userId: string | any

  constructor(
    private flashMessageService: FlashMessagesService,
    private userService: UserService,
    private router: Router,
    private auth: AuthService,
    
  ) { }

  ngOnInit(): void {
    this.auth.getAuth().subscribe(userAuth => {
      this.userId = userAuth?.uid[0]
      // console.log(this.userId)
      if(this.userId){
        this.userService.getUserDetails().subscribe(user =>{
          this.user = user[0];
         
          // console.log(user)
        })
      } 
    }) ;
  }

}
