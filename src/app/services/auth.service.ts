import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UserInterface } from '../components/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth:AngularFireAuth,private afs:AngularFirestore) { }
  
  registerUser(datos: UserInterface){
    return this.afsAuth.createUserWithEmailAndPassword(datos.email, datos.password);
  }

  loginEmailUser(email:string, pass:string){
    return new Promise((resolve, reject)=>{
      this.afsAuth.signInWithEmailAndPassword(email,pass)
      .then(userData=> resolve(userData),
      err=>reject(err))
    })
  }
  async onReset(user:UserInterface){
    try{
      console.log(user.email);
      return this.afsAuth.sendPasswordResetEmail(user.email)
    }catch(error){
      console.log(error);
    }
  }


  logoutUser(){
    return this.afsAuth.signOut();
  }
  
  

  isAuth(){
    return this.afsAuth.authState;
  }

  async getUid(){
    const user =await this.afsAuth.currentUser;
    return user.uid
  }

  isUserAdmin(userUid:any){
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }


}
