import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  headers = new HttpHeaders({
    "x-rapidapi-host":"community-open-weather-map.p.rapidapi.com",
    "x-rapidapi-key":"1881778cadmshcd871c6e9c81210p103fe3jsnb4e7ec8948cd"
  });

  constructor(private http : HttpClient) {
    
   }

  getDefaultWeather() : Observable<any>{
    return this.http.get<any>("https://community-open-weather-map.p.rapidapi.com/weather?callback=test&id=2172797&units=%2522metric%2522%20or%20%2522imperial%2522&mode=xml%252C%20html&q=London%252Cuk",{headers : this.headers});
  }
}
