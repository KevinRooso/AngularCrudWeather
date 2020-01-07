import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { User } from 'src/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserObject } from 'src/user-object';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  BASE_URL = "http://192.168.1.56:8080/";
  DASHBOARD_URL = this.BASE_URL+"dashboard";  
  unm = sessionStorage.getItem("username");
  USERNAME_URL = this.DASHBOARD_URL+"/"+this.unm;
  ADDUSER_URL = this.BASE_URL+"adduser";
  UPDATE_URL = this.BASE_URL+"update";
  DELETE_URL = this.BASE_URL+"delete/";
  REFRESH_URL = this.BASE_URL+"token";

  headers = new HttpHeaders({
    Authorization: sessionStorage.getItem("token")
  });

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  getRfTime(){
    if(this.time.getMinutes()+this.rfTime.getMinutes()>=60){
      let temp = 60 - this.rfTime.getMinutes();
      this.rfTime.setMinutes(0);
      this.time.setMinutes(this.time.getMinutes()+temp);
    }
    if(this.time.getMinutes() - this.rfTime.getMinutes() < 14 && this.time.getMinutes() - this.rfTime.getMinutes() > 0){
      this.http.get<any>(this.REFRESH_URL,{headers : this.headers}).subscribe(
        res => {
          sessionStorage.setItem("token",res);
        },
        err => {
          console.log(err);
        }
      );        
    }      
  }

  tokenInfo = this.getDecodedAccessToken(sessionStorage.getItem("token"));
  exp = this.tokenInfo.exp;
  time : Date = new Date(this.exp * 1000)
  rfTime = new Date();

  constructor(private http: HttpClient,private router: Router) {}

  showAllUsers(): Observable<UserObject>{
    console.log(sessionStorage.getItem("token"));
    console.log(this.time.toLocaleTimeString());
    this.getRfTime();
    return this.http.get<UserObject>(this.DASHBOARD_URL,{headers : this.headers});
  }

/*  showAllUsers(): Observable<HttpResponse<User[]>>{
    return this.http.get<User[]>(this.DASHBOARD_URL, { observe : 'response'});
  }
*/

  getUserByUname(unm : String): Observable<any> {    
    return this.http.post<any>(this.USERNAME_URL,unm,{headers : this.headers});
  }

  saveUser(user : User): Observable<any>{
    return this.http.post<any>(this.ADDUSER_URL,user,{headers : this.headers});
  }

  editUser(user : User): Observable<any>{
    return this.http.post<any>(this.UPDATE_URL,user,{headers : this.headers});
  }

  deleteUser(id : number): Observable<any>{
    return this.http.get<any>(this.DELETE_URL+id,{headers : this.headers});
  }

  logUserOut(){
    return this.router.navigate(['logout']);
  }

  denied(){
    return this.router.navigate(['../error']);
  }
}
