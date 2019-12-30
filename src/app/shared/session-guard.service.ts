import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuardService implements CanActivate{

  constructor(private router : Router,private authService : LoginService) { }

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot){
    if(this.authService.isUserLoggedIn()){
     return true;
    }
    else{
      this.router.navigate(['error']);
      return false;
    }
  }
}
