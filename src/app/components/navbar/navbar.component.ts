import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router} from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean | any;
  loggedInUser: string | any;
  showRegister: boolean | any;
   

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessagesService,
    
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth =>{
      if(auth){
        this.isLoggedIn=true;
       
        this.loggedInUser = auth.email;
      }else{
        this.isLoggedIn=false
      }
    });
  }
  onLogoutClick(){
    this.authService.logout();
    this.flashMessageService.show('You are now logged out',{
      cssClass: 'alert-success', timeout:4000
    });
    this.router.navigate(['/login'])
  }

}
