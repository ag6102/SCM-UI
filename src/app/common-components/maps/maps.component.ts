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
  @ViewChild('map', {static: true}) mapElement: any;
  map1: google.maps.Map;

  @Input() mapsData; 
  map;
  center = [53.1424, 7.6921];
  marker;

  constructor() { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.ngOnInit();
  }
  ngOnInit() {
    this.map = this.initializeMap();
      if(this.mapsData.type == 'pollution'){
        this.fetchPollutionData();
      }else if(this.mapsData.type == 'bike'){
        this.fetchBikesData();
      }
      else if(this.mapsData.type == 'traffic'){
        this.fetchTrafficDetails();
      }
      else if(this.mapsData.type == 'busstop'){
        this.fetchBusStopData();
      }
      else if(this.mapsData.type == 'luasstop'){
        this.fetchLuasStopData();
      }
      else if(this.mapsData.type == 'irishrailstop'){
        this.fetchIrishRailStopData();
      }
  }

  initializeMap(){
    var map = new google.maps.Map((this.mapElement.nativeElement), {
    zoom: 15,
    center: {lat: 53.349562, lng: -6.278198},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  return map;
  }

  fetchPollutionData(){
    let pollutionCooardinates = this.mapsData.coordinates;
    for (let i = 0; i < pollutionCooardinates.length; i++) {  
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(pollutionCooardinates[i].cordinate[0], pollutionCooardinates[i].cordinate[1]),
        map: this.map
      });
      var infowindow = new google.maps.InfoWindow({
      content: pollutionCooardinates[i].msg
    });
  
    marker.addListener('click', function() {
      infowindow.open(marker.get('map'), marker);
    });
    }
  }

  fetchBikesData(){
    let bikesCooardinates = this.mapsData.coordinates;
    var marker;
    for (let i = 0; i < bikesCooardinates.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(bikesCooardinates[i].cordinate[0], bikesCooardinates[i].cordinate[1]),
        map: this.map
      });
    this.attachSecretMessage(marker, 'Available Stands : '+bikesCooardinates[i].availableBikeStands+' Available Bikes : '+bikesCooardinates[i].availableBikes);
    }
  }

  fetchLuasStopData(){
    let luasStopCooardinates = this.mapsData.coordinates;
    var marker;
    for (let i = 0; i < luasStopCooardinates.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(luasStopCooardinates[i].cordinate[0], luasStopCooardinates[i].cordinate[1]),
        map: this.map
      });
    //this.attachSecretMessage(marker, 'Available Stands : '+luasStopCooardinates[i].availableBikeStands+' Available Bikes : '+bikesCooardinates[i].availableBikes);
    }
  }

  fetchBusStopData(){
    let busStopCooardinates = this.mapsData.coordinates;
    var marker;
    for (let i = 0; i < busStopCooardinates.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(busStopCooardinates[i].cordinate[0], busStopCooardinates[i].cordinate[1]),
        map: this.map
      });
    //this.attachSecretMessage(marker, 'Available Stands : '+luasStopCooardinates[i].availableBikeStands+' Available Bikes : '+bikesCooardinates[i].availableBikes);
    }
  }

  fetchIrishRailStopData(){
    let irishRailStopCooardinates = this.mapsData.coordinates;
    var marker;
    for (let i = 0; i < irishRailStopCooardinates.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(irishRailStopCooardinates[i].cordinate[0], irishRailStopCooardinates[i].cordinate[1]),
        map: this.map
      });
    //this.attachSecretMessage(marker, 'Available Stands : '+luasStopCooardinates[i].availableBikeStands+' Available Bikes : '+bikesCooardinates[i].availableBikes);
    }
  }

  fetchTrafficDetails(){
    // let trafficData = this.mapsData.coordinates;
    // for (let i = 0; i < trafficData.length; i++) {
    //   var coordinates = trafficData[i].coordinates.coordinate;
    //   var color = trafficData[i].color;
    //   var roadTrafficCoordinates = [];
    //   for (let j = 0; j < coordinates.length; j++) {
    //     roadTrafficCoordinates.push({lat: coordinates[j].latitude, lng: coordinates[j].longitude})
        
    // }
    //   var trafficPath = new google.maps.Polyline({
    //     path: roadTrafficCoordinates,
    //     geodesic: true,
    //     strokeColor: color,
    //     strokeOpacity: 1.0,
    //     strokeWeight: 3
    //   });
    
      
    // trafficPath.setMap(this.map);
    // }
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: 34.04924594193164, lng: -118.24104309082031}
    });
  
    // var trafficLayer = new google.maps.TrafficLayer();
    // trafficLayer.setMap(this.map);
  }
  attachSecretMessage(marker, secretMessage) {
    var infowindow = new google.maps.InfoWindow({
      content: secretMessage
    });
  
    marker.addListener('click', function() {
      infowindow.open(marker.get('map'), marker);
    });
  }

}
