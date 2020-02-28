import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import config from '../../../assets/config/dev-config.json';
declare let L;
declare let tomtom: any;
declare var ol: any;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit, OnChanges  {
  map: any;
  @Input() mapsData; 
  constructor() { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
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

  ngOnInit() 
  {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([-6.2573678, 53.346939]),
        zoom: 12
      })
    });
  }


  storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        console.log('Here');
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

  addPoint(points, imgSrc: string) {
    var features = [];
    if (this.storageAvailable('localStorage'))
    {
      console.log("true");
    }
    else
    {
      console.log("False");
    }
    for (let i = 0; i < points.length; i++) {
      let latitude = points[i].cordinate[0];
      let longitude = points[i].cordinate[1];
      console.log(latitude, longitude)
      var iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform([longitude, latitude], 'EPSG:4326',     
        'EPSG:3857'))
      });
      var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',        
        src: "assets/images/" + imgSrc
        }))
      });
      iconFeature.setStyle(iconStyle);
      features.push(iconFeature);
    }
    var vectorSource = new ol.source.Vector({
      features: features //add an array of features
    });
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
    });
  this.map.addLayer(vectorLayer);
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
    let bikesCoordinates = this.mapsData.coordinates;
    //for (let i = 0; i < bikesCoordinates.length; i++) {
      //console.log(bikesCoordinates[i].cordinate[0], bikesCoordinates[i].cordinate[1]);
    this.addPoint(bikesCoordinates, "bike.png");
    //}
    // var marker;
    // for (let i = 0; i < bikesCoordinates.length; i++) {  
    //   marker = new google.maps.Marker({
    //     position: new google.maps.LatLng(bikesCoordinates[i].cordinate[0], bikesCoordinates[i].cordinate[1]),
    //     map: this.map
    //   });
    // this.attachSecretMessage(marker, 'Available Stands : '+bikesCooardinates[i].availableBikeStands+' Available Bikes : '+bikesCooardinates[i].availableBikes);
    // }
  }

  fetchLuasStopData(){
    let luasStopCooardinates = this.mapsData.coordinates;
    //for (let i = 0; i < luasStopCooardinates.length; i++) {
      //console.log(luasStopCooardinates[i].cordinate[0], luasStopCooardinates[i].cordinate[1]);
    this.addPoint(luasStopCooardinates, "luas.png");
    //}
    //this.attachSecretMessage(marker, 'Available Stands : '+luasStopCooardinates[i].availableBikeStands+' Available Bikes : '+bikesCooardinates[i].availableBikes);
  }

  fetchBusStopData(){
    let busStopCooardinates = this.mapsData.coordinates;
    //for (let i = 0; i < busStopCooardinates.length; i++) {
      //console.log(busStopCooardinates[i].cordinate[0], busStopCooardinates[i].cordinate[1]);
    this.addPoint(busStopCooardinates, "bus.png");
    //}
    //this.attachSecretMessage(marker, 'Available Stands : '+luasStopCooardinates[i].availableBikeStands+' Available Bikes : '+bikesCooardinates[i].availableBikes);
  }

  fetchIrishRailStopData(){
    let irishRailStopCooardinates = this.mapsData.coordinates;
    //for (let i = 0; i < irishRailStopCooardinates.length; i++) {
      //console.log(irishRailStopCooardinates[i].cordinate[0], irishRailStopCooardinates[i].cordinate[1]);
    this.addPoint(irishRailStopCooardinates, "dart.png");
    //}
    //this.attachSecretMessage(marker, 'Available Stands : '+luasStopCooardinates[i].availableBikeStands+' Available Bikes : '+bikesCooardinates[i].availableBikes);
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
    /*var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: 34.04924594193164, lng: -118.24104309082031}
    });*/
  
    // var trafficLayer = new google.maps.TrafficLayer();
    // trafficLayer.setMap(this.map);
  }
  /*attachSecretMessage(marker, secretMessage) {
    var infowindow = new google.maps.InfoWindow({
      content: secretMessage
    });
  
    marker.addListener('click', function() {
      infowindow.open(marker.get('map'), marker);
    });
  }*/

}
