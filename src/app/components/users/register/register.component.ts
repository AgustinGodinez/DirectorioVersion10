import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserInterface } from 'src/app/components/models/user';
import { UserdbService } from 'src/app/services/userdb.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isAlert=false;
  alertMsg='';

  datos:UserInterface={
    id: null,
    name: null,
    email: null,
    password: null,
    roles: {
      rol:null
    },
  }

  public email: string = '' ;
  public password: string = '';

  constructor(private authService: AuthService, private userdb:UserdbService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
  }

  async onAddUser(){
    const res= await this.authService.registerUser(this.datos).catch((err) => {
        console.log('error', this.alertMsg ='La dirección de correo electrónico ya está en uso por otra cuenta.', this.isAlert=true);
      })
    if(res){ 
      console.log('exito al crear Usurio');   
      const path= 'users';
      const id =res.user.uid;
      this.datos.id=id;
      this.datos.name=this.datos.name;
      this.datos.password= this.datos.password;
      this.datos.roles=this.datos.roles
      await this.userdb.createDoc(this.datos,path,id);

     this.authService.isAuth().subscribe(user =>{
           if(user){
                user.updateProfile({
                    displayName:this.datos.name
                })
           }
     })


      this.toast.success({detail:'Bienvenido', summary:'Registro exitoso', position:'tr', duration:5000});
      this.router.navigate(['home'])
      .catch((err) => console.log('error', this.alertMsg ='La dirección de correo electrónico ya está en uso por otra cuenta.', this.isAlert=true));
   } 
  }



  onLoginRedirect(): void {
    this.router.navigate(['home']);
  }

}
