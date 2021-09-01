import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserMeasurements } from 'src/app/models/user-measurements';
import { AuthService } from 'src/app/services/auth.service';
import { UserDetails } from 'src/app/models/user-details';

@Component({
  selector: 'app-user-measurements',
  templateUrl: './user-measurements.component.html',
  styleUrls: ['./user-measurements.component.css'],
})
export class UserMeasurementsComponent implements OnInit {
  measurements: UserMeasurements | any;
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
        cssClass: 'alert-danger', timeout: 4000
      });
    }else{
      this.userService.editUserMeasurements(this.measurements.id, this.measurements)
      console.log(this.userId)
      if(!this.measurements){
        this.flashMessageService.show('Details added successfully!',{
          cssClass: 'alert-success', timeout: 4000
        
        });
    }else{
      this.flashMessageService.show('Details edited successfully!',{
        cssClass: 'alert-success', timeout: 4000
      });
    }
   
    }
      this.router.navigate(['/']);
      // console.log(this.user)
    }
  }



