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
  center = [53.1424, 7.6921];
  marker;

  constructor() { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.ngOnInit();
  }

  ngOnInit() {
    let map;
    if(this.map != undefined){
      this.map.remove();
    }
    map = this.initializeMap();
    if(this.mapsData != undefined && this.mapsData.coordinates && this.mapsData.coordinates.length >0){
      if(this.mapsData.type == 'pollution'){
        this.fetchPollutionData(map);
      }else if(this.mapsData.type == 'bike'){
        this.fetchBikesData(map);
      }
      else if(this.mapsData.type == 'traffic'){
        this.fetchTrafficDetails(map);
      }
    }
  }

  initializeMap(){
    this.map = new tomtom.L.map('map', {
      key: config.CONSTANTS.TOMTOM_API_KEY,
      basePath: '/assets/sdk',
      center: this.center,
      zoom: 15,
      source : 'vector'
    });
    return this.map;
  }

  fetchPollutionData(map){
    let pollutionCooardinates = this.mapsData.coordinates;
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
    pollutionCooardinates.forEach ((child) => {
      this.marker = tomtom.L.marker(child.cordinate, child.aqi_display >=1 && child.aqi_display <=3  ? greenIcon : (child.aqi_display >=4 && child.aqi_display <=7 ? yellowIcon : redIcon)).addTo(map);
      this.marker.bindPopup(child.msg).openPopup();
      //marker.bindPopup(child.msg);
    }, this);
  }

  fetchBikesData(map){
    let bikesCooardinates = this.mapsData.coordinates;
    console.log('derrefewf', this.mapsData);
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
    bikesCooardinates.forEach ((child) => {
      this.marker = tomtom.L.marker(child.cordinate, child.status == 'OPEN'  ? greenIcon : redIcon).addTo(map);
      this.marker.bindPopup('Available Stands : '+child.availableBikeStands+' Available Bikes : '+child.availableBikes).openPopup();
      //marker.bindPopup(child.msg);
    }, this);
  }

  fetchTrafficDetails(map){
    map.addControl(new tomtom.L.NavigationControl());
  }

}
