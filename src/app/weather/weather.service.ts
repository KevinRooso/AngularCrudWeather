import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  API_KEY = "1b243ea3e01fa400d1af5cb824ba8eab";

  constructor(private http : HttpClient) {
    
   }

  getDefaultWeather() : Observable<any>{
    return this.http.get<any>("http://api.openweathermap.org/data/2.5/weather?lat=28.7041&lon=77.1025&units=metric&APPID=1b243ea3e01fa400d1af5cb824ba8eab");
  }

  getWeather(latitude: string , longitude: string): Observable<any>{
    return this.http.get<any>(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=1b243ea3e01fa400d1af5cb824ba8eab`)
  }
}
