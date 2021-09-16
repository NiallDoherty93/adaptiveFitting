import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string | any;
  password: string | any;
 
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService 
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth =>{
      if(auth){
        this.router.navigate(['/dashboard'])
      }
    });
  }

  onSubmit(){
    this.authService.login(this.email, this.password)
    .then(res => {
      this.flashMessage.show('You are now logged in', {
        cssClass: 'alert-success', timeout:FLASH_MESSAGE_TIMEOUT
      });
      this.router.navigate(['/dashboard'])
    })
    .catch(err => {
      this.flashMessage.show(err.message, {
        cssClass: 'alert-danger', timeout:FLASH_MESSAGE_TIMEOUT
      });
    });
}



}
