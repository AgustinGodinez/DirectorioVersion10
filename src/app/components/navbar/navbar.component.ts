import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service'; 
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isLogged: boolean;
  public usuario:any;
  constructor(private authService:AuthService, private afsAuth:AngularFireAuth,private router:Router) { 
    this.isLogged = false
  }

  public userRol:any=null;
  public userUid:any=null;

  ngOnInit(): void {
    this.getCurrentUser();
    this.getCurrentUserAdmin();
  }
  getCurrentUserAdmin(){
    this.authService.isAuth().subscribe(auth=>{
      if(auth){
        this.userUid=auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole=>{
          this.userRol=Object.assign({},userRole?.roles).rol;
          if(this.userRol=='inhabilita'){
            console.log(this.userRol);
            
            this.afsAuth.signOut().then(res=>{
              this.router.navigate(['register']).then(res=>{
                location.reload()
              })
            })
          }
        })
      }
    });
  }
  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth) {
        console.log('usuario logueado',);
        this.isLogged=true;
      }else{
        console.log('no loggueado');
        this.isLogged=false;
      }
    });
  }

  onLogout(){
    Notiflix.Loading.standard('Cargando...')
    Notiflix.Loading.remove(2000);
    this.afsAuth.signOut()
    this.router.navigate(['register'])
  }

}
