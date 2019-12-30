import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import { WeatherService } from './weather.service';
import {faSun,faCloud,faCloudSun,faCloudSunRain,faCloudRain,faWind,faTint,faSnowflake} from '@fortawesome/free-solid-svg-icons';
import { CurrData } from './curr-weather';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit,OnChanges {

  i = 0;
  faSun = faSun;
  faCloud = faCloud;
  faCloudSun = faCloudSun;
  faCloudSunRain = faCloudSunRain;
  faCloudRain = faCloudRain;
  faTint = faTint;
  faWind = faWind;
  faSnowflake = faSnowflake;
  currData : CurrData;
  loading = true;

  @Input() lat:any;
  @Input() lon:any;

  constructor(private weatherService : WeatherService) { }

  ngOnInit() {
    this.getDefaultWeather(this.lat,this.lon);    
    console.log(this.lon);
  }

  ngOnChanges(){
    this.getDefaultWeather(this.lat,this.lon);
    console.log(this.lat);
  }
  
  getDefaultWeather(Lat:any,Lon:any){
    this.weatherService.getWeather(Lat,Lon).subscribe(
      res => {
        this.currData = res;
        this.loading = false;
        let time = new Date(this.currData.dt * 1000);
        this.currData.dt = time.toLocaleTimeString();
      },
      err => {
        console.log("error");
      }
    );
  }

}
