import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectorioComponent } from './components/admin/directorio/directorio.component';
import { HomeComponent } from './components/home/home.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PipeAdminPipe } from './pipes/pipe-admin.pipe';
import { PipeUserFilterPipe } from './pipes/pipe-user-filter.pipe';
import { PipeUserPipe } from './pipes/pipe-user.pipe';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms"; 
import { environment } from '../environments/environment';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage' ;
import {NgxPaginationModule} from 'ngx-pagination';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgToastModule } from 'ng-angular-popup';



@NgModule({
  declarations: [
    AppComponent,
    DirectorioComponent,
    HomeComponent,
    ListUsersComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FilterPipe,
    PipeAdminPipe,
    PipeUserFilterPipe,
    PipeUserPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    NgToastModule,
  ],
  providers: [AngularFireAuth,AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
