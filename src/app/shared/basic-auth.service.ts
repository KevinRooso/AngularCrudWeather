import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    if(sessionStorage.getItem("token")){
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem("token")
        }
      });
    }
    return next.handle(req);
  }
}
