import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/models/user-details';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class AddUserDetailsComponent implements OnInit {
  detailsExist: boolean|any =true;
  user: UserDetails | any;
  userId: string | any


  userDetails: UserDetails = {
    uid: '',
    address: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    postcode: ''
  }

  constructor(private flashMessageService: FlashMessagesService,
    private userService: UserService,
    private router: Router,
    private auth: AuthService) 
    { }

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

  onSubmitAdd({value, valid}: NgForm){
    if (!valid){
      this.flashMessageService.show('Please fill out the form correctly',{
        cssClass: 'alert-danger', timeout: 4000
      });
    }else{
      this.userService.editUserDetails(this.user.id, this.user)
      if(!this.user){
        this.flashMessageService.show('Details added successfully!',{
          cssClass: 'alert-success', timeout: 4000
        
        });
      }else{
        this.flashMessageService.show('Details edited successfully!',{
          cssClass: 'alert-success', timeout: 4000
        });
      }
      
      this.router.navigate(['/']);
      // console.log(this.user)
    }

    
  }



  


}