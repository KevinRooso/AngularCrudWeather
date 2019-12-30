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
  uid = sessionStorage.getItem("id");
  USERID_URL = this.DASHBOARD_URL+"/"+this.uid;
  ADDUSER_URL = this.BASE_URL+"adduser";
  UPDATE_URL = this.BASE_URL+"update";
  DELETE_URL = this.BASE_URL+"delete/";

  constructor(private http: HttpClient,private router: Router) {}

  showAllUsers(): Observable<UserObject>{
    return this.http.get<UserObject>(this.DASHBOARD_URL);
  }

/*  showAllUsers(): Observable<HttpResponse<User[]>>{
    return this.http.get<User[]>(this.DASHBOARD_URL, { observe : 'response'});
  }
*/

  getUserById(id : number): Observable<any> {    
    return this.http.post<any>(this.USERID_URL,id);
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
