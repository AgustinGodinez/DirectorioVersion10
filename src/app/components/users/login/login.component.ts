import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isAlert=false;
  alertMsg='';

  public email:string='';
  public password:string='';

  constructor(public afAuth: AngularFireAuth,private router: Router,private authService: AuthService, private toast: NgToastService) { }

  ngOnInit(): void {
  }

  onLogin():void{
    this.authService
    .loginEmailUser(this.email , this.password )
    .then((res) => {
      this.toast.success({detail:'Bienvenido', summary:'Inicio de sesion exitoso', position:'tr', duration:5000});
      this.onLoginRedirect();
    })
    .catch((err) => console.log('error', this.alertMsg =err.message, this.isAlert=true));
  };

  
  onLoginRedirect():void{

    this.router.navigate(['home']);
  } 

}
