import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


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

  forgotPassword(passwordResetEmail: string) {
    return this.firebaseAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }


}
