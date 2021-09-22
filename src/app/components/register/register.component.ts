import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';
import { Observable } from 'rxjs';
import { UserDetails } from 'src/app/models/user-details';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string | any;
  password: string | any;
  confirmPassword: string | any;
  uid: string | any;
  user: UserDetails
  roles: boolean
  
 

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService  ,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

   onSubmit(){
     if (this.password===this.confirmPassword){
      this.authService.register(this.email, this.password)
      
      .then(res => {
        this.userService.createUserDetails({email: this.email})
        this.userService.createUserMeasurements({uid: this.uid})
        
      
        this.flashMessage.show('You are now registered and logged in',{
          cssClass: 'alert-success', timeout: FLASH_MESSAGE_TIMEOUT
        });
        this.router.navigate(['/profile'])
      })
      .catch(err =>{
        this.flashMessage.show(err.message,{
          cssClass: 'alert-danger', timeout: FLASH_MESSAGE_TIMEOUT
        });
  
      });
     }else{
      this.flashMessage.show("Passwords dont match",{
        cssClass: 'alert-danger', timeout: FLASH_MESSAGE_TIMEOUT
      });
     }
  }




}
