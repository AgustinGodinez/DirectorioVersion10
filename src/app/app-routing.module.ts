import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectorioComponent } from './components/admin/directorio/directorio.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'home', component: HomeComponent },// todo el mundo
  { path:'directorio', component: DirectorioComponent, canActivate:[AuthGuard]},// only user auth
  { path:'login', component: LoginComponent },
  { path:'users', component: ListUsersComponent, canActivate:[AuthGuard]},
  { path:'register', component: RegisterComponent },
  {path:'**', redirectTo:'/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
