import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(public firebaseAuth: AngularFireAuth, 
    
    ) { 
     
    }

  public login(email: string, password: string){
    return new Promise((resolve, reject) =>{
      this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(userData => resolve(userData),
      err => reject(err))
    })
  }

  getAuth(){
    return this.firebaseAuth.authState.pipe(auth => auth);
  }

  logout(){
    this.firebaseAuth.signOut();
    
  }
  public register(email: string, password: string){
    return new Promise((resolve, reject) =>{
      this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(userDate => resolve(userDate),
      err => reject(err))
    })
  }
}
