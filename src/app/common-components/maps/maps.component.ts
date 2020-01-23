import { Component, OnInit, Input, OnChanges } from '@angular/core';
import config from '../../../assets/config/dev-config.json';
declare let L;
declare let tomtom: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnChanges  {

  @Input() mapsData; 
  map;

  constructor() { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.ngOnInit();
  }

  ngOnInit() {
    if(this.mapsData != undefined && this.mapsData.coordinates && this.mapsData.coordinates.length >0){
      let pollutionCooardinates = this.mapsData.coordinates;
      let center = this.mapsData.center;
      let iconSize = [25, 40];
      let greenIcon  = {
        icon: tomtom.L.icon({
              iconUrl: '../../../assets/icons/greenIcon.png',
              iconSize: iconSize,
              iconAnchor: [17, 70],
              popupAnchor: [12, -80]
        })
      };
      let redIcon  = {
        icon: tomtom.L.icon({
            iconUrl: '../../../assets/icons/redIcon.png',
              iconSize: iconSize,
              iconAnchor: [17, 70],
              popupAnchor: [12, -80]
        })
      };
      let yellowIcon  = {
        icon: tomtom.L.icon({
            iconUrl: '../../../assets/icons/yellowIcon.png',
              iconSize: iconSize,
              iconAnchor: [17, 70],
              popupAnchor: [12, -80]
        })
      };
      const map = new tomtom.L.map('map', {
        key: config.CONSTANTS.TOMTOM_API_KEY,
        basePath: '/assets/sdk',
        center: center,
        zoom: 15,
        source : 'vector'
      });
      pollutionCooardinates.forEach (function (child) {
        var marker = tomtom.L.marker(child.cordinate, child.aqi_display >=1 && child.aqi_display <=3  ? greenIcon : (child.aqi_display >=4 && child.aqi_display <=7 ? yellowIcon : redIcon)).addTo(map);
        marker.bindPopup(child.msg).openPopup();
        //marker.bindPopup(child.msg);
      });
    }
  }

}
