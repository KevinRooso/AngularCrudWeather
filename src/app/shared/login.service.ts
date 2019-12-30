import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LoginModel } from '../login/login.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  LOGIN_URL = "http://192.168.1.56:8080/authenticate";

  constructor(private http: HttpClient,private router: Router) { }
  
  login(loginModel : LoginModel) : Observable<any>{
    return this.http.post<any>(this.LOGIN_URL, loginModel);
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem("id");
    return !(user == null);
  }

  successful(){
    return this.router.navigate(['../dashboard']);
  }
  
  logout(){
    sessionStorage.removeItem("id");    
  }
}
