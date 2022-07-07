import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,RouterStateSnapshot, UrlTree } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afsAuth:AngularFireAuth, private router:Router){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afsAuth.authState
    .pipe(take(1))
    .pipe(map(authState=>!!authState))
    .pipe(tap(auth=>{
      if(!auth){
        this.router.navigate(['login'])
      }
    }))
  }

}
