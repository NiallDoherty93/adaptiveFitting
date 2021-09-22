import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserMeasurements } from 'src/app/models/user-measurements';
import { AuthService } from 'src/app/services/auth.service';
import { UserDetails } from 'src/app/models/user-details';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';

@Component({
  selector: 'app-user-measurements',
  templateUrl: './user-measurements.component.html',
  styleUrls: ['./user-measurements.component.css'],
})
export class UserMeasurementsComponent implements OnInit {
  measurements: UserMeasurements;
  userId: string | any;

 

  constructor(
    private flashMessageService: FlashMessagesService,
    private userService: UserService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.getAuth().subscribe(userAuth => {
      this.userId = userAuth?.uid[0]
      // console.log(this.userId)
      if(this.userId){
        this.userService.getUserMeasurements().subscribe(measurement =>{
          this.measurements = measurement[0];
         
          console.log(measurement)
        })
      } 
    }) ;
  }


  onSubmitAddMeasurements({value, valid}: NgForm){
    if (!valid){
      this.flashMessageService.show('Please fill out the form correctly',{
        cssClass: 'alert-danger', timeout: FLASH_MESSAGE_TIMEOUT
      });
    }else{
      this.userService.editUserMeasurements(this.measurements.id, this.measurements)
      console.log(this.userId)
      if(!this.measurements){
        this.flashMessageService.show('Details added successfully!',{
          cssClass: 'alert-success', timeout: FLASH_MESSAGE_TIMEOUT
        
        });
        this.router.navigate(['/profile']);
    }else{
      this.flashMessageService.show('Details edited successfully!',{
        cssClass: 'alert-success', timeout: FLASH_MESSAGE_TIMEOUT
      });
      this.router.navigate(['/profile']);
    }
   
    }
      
      // console.log(this.user)
    }
  }



