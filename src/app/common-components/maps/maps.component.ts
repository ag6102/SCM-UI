import { Component, OnInit, Input, OnChanges, ViewChild } from "@angular/core";
import config from "../../../assets/config/dev-config.json";
import { TimetablesService } from "../../services/timetables.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {} from "googlemaps";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CommunicationComponent } from "src/app/communication/communication.component";
import { TimetableComponent } from "src/app/common-components/timetable/timetable.component";
import { NotificationService } from "src/app/services/notification.service";
import { AuthenticationService } from "src/app/services/authentication.service";

declare let L;
declare let tomtom: any;
var markers = [];
var trafficPath;

@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.css"],
})
export class MapsComponent implements OnInit, OnChanges {
  @ViewChild("map", { static: true }) mapElement: any;
  map1: google.maps.Map;

  @Input() mapsData;
  map;
  center = [53.1424, 7.6921];

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private authService: AuthenticationService,
    private timetableService: TimetablesService
  ) {}

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (markers != null) {
      this.clearMarkers();
    }
    if (trafficPath != null) {
      trafficPath.setMap(null);
    }
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
    let that = this;
    google.maps.event.addListener(this.map, "click", function (args) {
      that.onRandomCoordinateClick(args.latLng);
    });
  }

  initializeMap() {
    var map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 14,
      center: { lat: 53.3479528, lng: -6.2582849 },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
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
        storage &&
        storage.length !== 0
      );
    }
  }

  addMarkers(coordinates, markerType: string) {
    // let tempJSON = {
    //   coordinates: coordinates,
    //   timestamp: new Date().valueOf()
    // };
    // if (this.mapsData.changeTypeAPI) {
    //   if (this.storageAvailable("localStorage")) {
    //     localStorage.setItem(
    //       markerType + "ObjectList",
    //       JSON.stringify(tempJSON)
    //     );
    //   }
    // }
    let marker;
    var iconSuffix = "";
    if (coordinates) {
      for (let i = 0; i < coordinates.length; i++) {
        if(markerType=='pollution'){
          var msg = coordinates[i].msg;
          console.log(msg);
          if (msg.trim() == 'Good air quality') {
            iconSuffix = "";
          } 
          else if (msg.trim() == 'Moderate air quality') {
            iconSuffix = "-med";
          }
          else{
            iconSuffix = '-high';
          }
        }
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(
            coordinates[i].cordinate[0],
            coordinates[i].cordinate[1]
          ),
          map: this.map,
          icon: {
            url: "assets/images/" + markerType + iconSuffix + ".png",
          },
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
            marker.addListener("click", () => {
              this.onCustomMarkerClick(markerType, coordinates[i]);
            });
            break;
          case "pollution":
            this.attachSecretMessage(marker, coordinates[i].msg);
            marker.addListener("click", () => {
              this.onCustomMarkerClick(markerType, coordinates[i]);
            });
            break;
          case "busstop":
            this.attachSecretMessage(marker, coordinates[i].standName);
            marker.addListener("click", () => {
              this.onCustomMarkerClick(
                markerType,
                coordinates[i].stopId,
                coordinates[i].standName
              );
            });
            break;
          case "irishrailstop":
            this.attachSecretMessage(marker, coordinates[i].standName);
            marker.addListener("click", () => {
              this.onCustomMarkerClick(markerType, coordinates[i].standName);
            });
            break;
          case "luasstop":
            this.attachSecretMessage(marker, coordinates[i].standName);
            break;
          default:
            break;
        }
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
    let trafficData = this.mapsData.coordinates
      ? this.mapsData.coordinates
      : [];
    for (let i = 0; i < trafficData.length; i++) {
      var coordinates = trafficData[i].coordinates.coordinate;
      var color = trafficData[i].color;
      var roadTrafficCoordinates = [];
      for (let j = 0; j < coordinates.length; j++) {
        roadTrafficCoordinates.push({
          lat: coordinates[j].latitude,
          lng: coordinates[j].longitude,
        });
      }
      trafficPath = new google.maps.Polyline({
        path: roadTrafficCoordinates,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });
      trafficPath.setMap(this.map);
    }
  }
  attachSecretMessage(marker, secretMessage) {
    var infowindow = new google.maps.InfoWindow({
      content: secretMessage,
    });

    marker.addListener("mouseover", function () {
      infowindow.open(marker.get("map"), marker);
    });

    marker.addListener("mouseout", function () {
      infowindow.close();
    });
  }

  // onClick(StopID) {
  //   this.timetableService
  //     .fetchTimetable("busstop", parseInt(StopID))
  //     .subscribe(response => {
  //       console.log(response);
  //     });
  // }
  // getTimeTable(marker, StopID) {
  //   marker.addListener("click", this.onClick.bind(this, StopID));
  // }

  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    return dialogConfig;
  }

  onCustomMarkerClick(markerType, standKey, busStandName = null) {
    if (markerType == "irishrailstop") {
      const dialogConfig = this.getDialogConfig();
      dialogConfig.data = { type: markerType, name: standKey };
      this.dialog.open(TimetableComponent, dialogConfig);
    } else if (markerType == "busstop") {
      let bus_tt;
      this.timetableService
        .fetchTimetable("busstop", standKey)
        .subscribe((response) => {
          bus_tt = JSON.parse(response);
          const dialogConfig = this.getDialogConfig();
          dialogConfig.data = {
            type: markerType,
            name: standKey,
            timetable: bus_tt,
            standName: busStandName,
          };
          this.dialog.open(TimetableComponent, dialogConfig);
        });
    } else if (markerType == "bike") {
      const dialogConfig = this.getDialogConfig();
      dialogConfig.data = { type: markerType, name: standKey };
      this.dialog.open(TimetableComponent, dialogConfig);
    } else if (markerType == "pollution") {
      const dialogConfig = this.getDialogConfig();
      dialogConfig.data = { type: markerType, name: standKey };
      this.dialog.open(TimetableComponent, dialogConfig);
    }
  }

  onRandomCoordinateClick(latLng) {
    // Opens a Communication componenet whenever a random geocoordinate is clicked.
    if (this.isAllowedToPublishNotification()) {
      const dialogConfig = this.getDialogConfig();
      dialogConfig.data = { lat: latLng.lat(), lng: latLng.lng() };
      let modalRef = this.dialog.open(CommunicationComponent, dialogConfig);
      modalRef.componentInstance.emitService.subscribe((emmitedValue) => {
        this.publishNotifcationWithBundle(emmitedValue);
        this.dialog.closeAll();
      });
    }
  }

  publishNotifcationWithBundle(bundle) {
    if (bundle) {
      this.notificationService
        .sendNotification(bundle)
        .subscribe((response) => {
          // TODO: Handle err.
        });
    }
  }

  isAllowedToPublishNotification() {
    // Checks if the logged in user has the permission to notify or not.

    let notifPermission = localStorage.getItem("notification_permission");
    let that = this;
    if (notifPermission) {
      return true;
    } else {
      this.authService.getUserPermissions().subscribe((response) => {
        let isAllowed = true;
        let permits = response["user"]["permits"];
        for (let permit in permits) {
          if (permits[permit] !== true) {
            isAllowed = false;
          }
        }
        if (isAllowed) {
          localStorage.setItem(
            "notification_permission",
            "notification_permission_read_write"
          );
          that.isAllowedToPublishNotification();
        }
      });
      return false;
    }
  }
}
