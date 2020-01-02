import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-w-dash',
  templateUrl: './w-dash.component.html',
  styleUrls: ['./w-dash.component.css']
})
export class WDashComponent implements OnInit {

  Lat=28.4595;
  Lon=77.0266;
  Latitude: any;
  Longitude: any;
  info: any;

  constructor() { }

  ngOnInit() {
  }

  OnGo(){
    this.Lat = this.Latitude;
    this.Lon = this.Longitude;
  }

  displayInfo(msg){
    this.info = msg;
  }

}
