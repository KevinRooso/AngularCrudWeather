import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from 'src/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserObject } from 'src/user-object';

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

  constructor(private http: HttpClient,private router: Router) {}

  showAllUsers(): Observable<UserObject>{
    console.log(sessionStorage.getItem("token"));
    return this.http.get<UserObject>(this.DASHBOARD_URL);
  }

/*  showAllUsers(): Observable<HttpResponse<User[]>>{
    return this.http.get<User[]>(this.DASHBOARD_URL, { observe : 'response'});
  }
*/

  getUserByUname(unm : String): Observable<any> {    
    return this.http.post<any>(this.USERNAME_URL,unm);
  }

  saveUser(user : User): Observable<any>{
    return this.http.post<any>(this.ADDUSER_URL,user);
  }

  editUser(user : User): Observable<any>{
    return this.http.post<any>(this.UPDATE_URL,user);
  }

  deleteUser(id : number): Observable<any>{
    return this.http.delete<any>(this.DELETE_URL+id);
  }

  logUserOut(){
    return this.router.navigate(['logout']);
  }

  denied(){
    return this.router.navigate(['../error']);
  }
}
