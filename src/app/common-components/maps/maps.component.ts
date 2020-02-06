import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import config from '../../../assets/config/dev-config.json';
import {} from 'googlemaps';
declare let L;
declare let tomtom: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnChanges  {
  @ViewChild('map', {}) mapElement: any;
  map1: google.maps.Map;

  @Input() mapsData; 
  map;

  constructor() { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    // this.ngOnInit();
  }
  ngOnInit() {
//     const mapProperties = {
//       center: new google.maps.LatLng(35.2271, -80.8431),
//       zoom: 15,
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//  };
//   this.map1 = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

  var map = new google.maps.Map((this.mapElement.nativeElement), {
    zoom: 15,
    center: {lat: 52.41072, lng: 4.84239},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var roadTrafficCoordinates = [
    {lat: 52.40606308516981, lng: 4.839773568917934},
    {lat: 52.40747152484432, lng: 4.836625120554913},
    {lat: 52.40750821722058, lng: 4.836540846321725}
  ];
  var trafficPath = new google.maps.Polyline({
    path: roadTrafficCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  var locations = [
    ['Bondi Beach', 52.40606308516981, 4.839773568917934],
    ['Coogee Beach', 52.40747152484432, 4.836625120554913],
    ['Cronulla Beach', 52.40750821722058, 4.836540846321725]
  ];
  for (var i = 0; i < locations.length; i++) {  
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });
  }

  trafficPath.setMap(map);
    // if(this.mapsData != undefined && this.mapsData.coordinates && this.mapsData.coordinates.length >0){
    //   let pollutionCooardinates = this.mapsData.coordinates;
    //   let center = this.mapsData.center;
    //   let iconSize = [25, 40];
    //   let greenIcon  = {
    //     icon: tomtom.L.icon({
    //           iconUrl: '../../../assets/icons/greenIcon.png',
    //           iconSize: iconSize,
    //           iconAnchor: [17, 70],
    //           popupAnchor: [12, -80]
    //     })
    //   };
    //   let redIcon  = {
    //     icon: tomtom.L.icon({
    //         iconUrl: '../../../assets/icons/redIcon.png',
    //           iconSize: iconSize,
    //           iconAnchor: [17, 70],
    //           popupAnchor: [12, -80]
    //     })
    //   };
    //   let yellowIcon  = {
    //     icon: tomtom.L.icon({
    //         iconUrl: '../../../assets/icons/yellowIcon.png',
    //           iconSize: iconSize,
    //           iconAnchor: [17, 70],
    //           popupAnchor: [12, -80]
    //     })
    //   };
    //   const map = new tomtom.L.map('map', {
    //     key: config.CONSTANTS.TOMTOM_API_KEY,
    //     basePath: '/assets/sdk',
    //     center: center,
    //     zoom: 15,
    //     source : 'vector'
    //   });
    //   pollutionCooardinates.forEach (function (child) {
    //     var marker = tomtom.L.marker(child.cordinate, child.aqi_display >=1 && child.aqi_display <=3  ? greenIcon : (child.aqi_display >=4 && child.aqi_display <=7 ? yellowIcon : redIcon)).addTo(map);
    //     marker.bindPopup(child.msg).openPopup();
    //     //marker.bindPopup(child.msg);
    //   });
    // }
  }

}
