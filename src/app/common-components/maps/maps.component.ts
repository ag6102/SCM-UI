import { Component, OnInit, Input, OnChanges, ViewChild } from "@angular/core";
import config from "../../../assets/config/dev-config.json";
import {} from "googlemaps";
import { TimetablesService } from '../../services/timetables.service';
declare let L;
declare let tomtom: any;
var markers = [];
var trafficPath;

@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.css"]
})
export class MapsComponent implements OnInit, OnChanges {
  @ViewChild("map", { static: true }) mapElement: any;
  map1: google.maps.Map;

  @Input() mapsData;
  map;
  center = [53.1424, 7.6921];
  // marker;

  constructor(private timetableService: TimetablesService) {}

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (markers != null) {
      this.clearMarkers();
    }
    if (trafficPath != null) {
      trafficPath.setMap(null);
    }
    console.log(this.mapsData.type);
    if (this.mapsData.type == "pollution") {
      this.fetchPollutionData();
    } else if (this.mapsData.type == "bike") {
      this.fetchBikesData();
    } else if (this.mapsData.type == "traffic") {
      this.fetchTrafficDetails();
    } else if (this.mapsData.type == "busstop") {
      this.fetchBusStopData();
    } else if (this.mapsData.type == "luasstop") {
      this.fetchLuasStopData();
    } else if (this.mapsData.type == "irishrailstop") {
      this.fetchIrishRailStopData();
    }
  }
  ngOnInit() {
    this.map = this.initializeMap();
  }

  initializeMap() {
    var map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 13,
      center: { lat: 53.349562, lng: -6.278198 },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    return map;
  }

  clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  storageAvailable(type) {
    var storage;
    try {
      storage = window[type];
      var x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage && storage.length !== 0
      );
    }
  }

  addMarkers(coordinates, markerType: string) {
    console.log(markerType);
    let tempJSON = {
      coordinates : coordinates,
      timestamp : new Date().valueOf()
    }
    if (this.mapsData.changeTypeAPI) {
      if (this.storageAvailable("localStorage")) {
        localStorage.setItem(
          markerType + "ObjectList",
          JSON.stringify(tempJSON)
        );
      }
    }
    let marker;
    for (let i = 0; i < coordinates.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          coordinates[i].cordinate[0],
          coordinates[i].cordinate[1]
        ),
        map: this.map,
        icon: {
          url: "assets/images/" + markerType + ".png"
        }
      });
      markers.push(marker);
      switch (markerType) {
        case "bike":
          this.attachSecretMessage(
            marker,
            coordinates[i].standName +
            " Available Stands : " +
              coordinates[i].availableBikeStands +
            " Available Bikes : " +
              coordinates[i].availableBikes
          );
          break;
        case "pollution":
          this.attachSecretMessage(marker, coordinates[i].msg);
          break;
        case "busstop":
          this.attachSecretMessage(marker, coordinates[i].standName);
          this.getTimeTable(marker,coordinates[i].stopId);
          break;
        case "irishrailstop":
          this.attachSecretMessage(marker, coordinates[i].standName);
          break;
        case "luasstop":
          this.attachSecretMessage(marker, coordinates[i].standName);
          break;
        default:
          break;
      }
    }
  }

  fetchPollutionData() {
    let pollutionCooardinates = this.mapsData.coordinates;
    this.addMarkers(pollutionCooardinates, "pollution");
  }

  fetchBikesData() {
    let bikesCooardinates = this.mapsData.coordinates;
    this.addMarkers(bikesCooardinates, "bike");
  }

  fetchLuasStopData() {
    let luasStopCooardinates = this.mapsData.coordinates;
    this.addMarkers(luasStopCooardinates, "luasstop");
  }

  fetchBusStopData() {
    let busStopCooardinates = this.mapsData.coordinates;
    this.addMarkers(busStopCooardinates, "busstop");
  }

  fetchIrishRailStopData() {
    let irishRailStopCooardinates = this.mapsData.coordinates;
    this.addMarkers(irishRailStopCooardinates, "irishrailstop");
  }

  fetchTrafficDetails() {
    let trafficData = this.mapsData.coordinates;
    for (let i = 0; i < trafficData.length; i++) {
      var coordinates = trafficData[i].coordinates.coordinate;
      var color = trafficData[i].color;
      var roadTrafficCoordinates = [];
      for (let j = 0; j < coordinates.length; j++) {
        roadTrafficCoordinates.push({
          lat: coordinates[j].latitude,
          lng: coordinates[j].longitude
        });
      }
      trafficPath = new google.maps.Polyline({
        path: roadTrafficCoordinates,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      trafficPath.setMap(this.map);
    }
    // var map = new google.maps.Map(document.getElementById('map'), {
    //   zoom: 13,
    //   center: {lat: 34.04924594193164, lng: -118.24104309082031}
    // });

    // var trafficLayer = new google.maps.TrafficLayer();
    // trafficLayer.setMap(this.map);
  }
  attachSecretMessage(marker, secretMessage) {
    var infowindow = new google.maps.InfoWindow({
      content: secretMessage
    });

    marker.addListener("mouseover", function() {
      infowindow.open(marker.get("map"), marker);
    });

    marker.addListener("mouseout", function() {
      infowindow.close();
    });
  }
  onClick(StopID)
  {
    this.timetableService.fetchTimetable("busstop",parseInt(StopID)).subscribe((response)=>{
      console.log(response);
    })
  }
  getTimeTable(marker, StopID)
  {
    marker.addListener("click", this.onClick.bind(this, StopID));
  }
}
