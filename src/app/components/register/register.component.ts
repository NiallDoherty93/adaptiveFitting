import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string | any;
  password: string | any;
  uid: string | any;
  
 

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService  ,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.register(this.email, this.password)
    .then(res => {
      this.userService.createUserDetails({email: this.email})
      this.userService.createUserMeasurements({uid: this.uid})
      
      this.flashMessage.show('You are now registered and logged in',{
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/'])
    })
    .catch(err =>{
      this.flashMessage.show(err.message,{
        cssClass: 'alert-danger', timeout: 4000
      });

    });
  }

}
