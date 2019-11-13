import { Component, OnInit, Input } from '@angular/core';
declare let L;
declare let tomtom: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  @Input() mapsData; 

  constructor() { }

  ngOnInit() {
    let pollutionCooardinates = this.mapsData.coordinates;
    let center = this.mapsData.center;
    let iconSize = [40, 40];
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
    const map = tomtom.L.map('map', {
      key: '69zn9YEOaXOsIbOWQWFiaWINh4yJobxv',
      basePath: '/assets/sdk',
      center: center,
      zoom: 15,
      source : 'vector'
    });
    pollutionCooardinates.forEach (function (child) {
      var marker = tomtom.L.marker(child.cordinate, child.color == 'green' ? greenIcon : (child.color == 'yellow' ? yellowIcon : redIcon)).addTo(map);
      marker.bindPopup(child.msg).openPopup();
      //marker.bindPopup(child.msg);
    });
  }

}
