import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UserInterface } from "src/app/components/models/user";
import { UserdbService } from "src/app/services/userdb.service";
import * as Notiflix from 'notiflix';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'



@Component({
  selector: "app-list-users",
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.scss"],
})
export class ListUsersComponent implements OnInit {
  users: UserInterface[];

  constructor(
    private authService: AuthService,
    private userdb: UserdbService,
    private router:Router
  ) {}
  
  public userRol: any = null;
  public userUid: any = null;

  ngOnInit(): void {
    this.getCurrentUser();
    this.userdb.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe((auth) => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe((userRole) => {
          this.userRol = Object.assign({}, userRole?.roles).rol;
        });
      }
    });
  }

  onPreUpdateUser(user:UserInterface): void{
    if(user.id){
      this.userdb.updateuser(user)
      
      Notiflix.Loading.standard('Cargando...')
    }
    this.router.navigate(['users']);
    Notiflix.Loading.remove(2000);
   }

   resetPass(user:UserInterface):void{
    if(user.id){
      this.authService.onReset(user).then(res=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `revise el correo de ${user.name} para el cambio de contraseña` ,
          text: `correo: ${user.email}`,
  
        })
      }).catch(error=>{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Ha ocurido un error para el reseteo de contreaseña`,  
          text: `no se ha podido enviar el correo para cambiar la contraseña a: ${user.email}`,
        })
      })
    }
    this.router.navigate(['users']);
   }
}
