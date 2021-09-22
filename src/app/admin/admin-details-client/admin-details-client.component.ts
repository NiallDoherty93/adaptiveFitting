import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { FLASH_MESSAGE_TIMEOUT } from 'src/app/global/application-constants';
import { UserDetails } from 'src/app/models/user-details';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-admin-details-client',
  templateUrl: './admin-details-client.component.html',
  styleUrls: ['./admin-details-client.component.css']
})
export class AdminDetailsClientComponent implements OnInit {
  id: string |any;
  user: UserDetails |any;
  role: UserDetails

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
       //get id from url
       this.id = this.route.snapshot.params['id'];
       //get product
       this.userService.getUserDetailsByUid(this.id).subscribe(user=>{
         this.user=user[0];
        console.log(user)
         
       })
    
  }

  onDeleteClick(){
    if(confirm('Are you sure?')){
      this.userService.deleteUser(this.user);
      this.flashMessage.show('User Removed',{
        cssClass: 'alert-success', timeout: FLASH_MESSAGE_TIMEOUT
      });
      this.router.navigate(['/admin/clients']);
    }
  }

}
