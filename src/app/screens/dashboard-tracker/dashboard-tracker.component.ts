import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
declare let L;
declare let tomtom: any;

@Component({
  selector: 'app-dashboard-tracker',
  templateUrl: './dashboard-tracker.component.html',
  styleUrls: ['./dashboard-tracker.component.css']
})
export class DashboardTrackerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var pollutionCooardinates = [53.3895286,-6.1190612];
    const map = tomtom.L.map('map', {
      key: '69zn9YEOaXOsIbOWQWFiaWINh4yJobxv',
      basePath: '/assets/sdk',
      center: pollutionCooardinates,
      zoom: 15,
      source : 'vector'
    });
    var marker = tomtom.L.marker(pollutionCooardinates).addTo(map);
    marker.bindPopup('your company name, your company address').openPopup();
    marker.bindPopup("<b>Pollution Info</b><br/>PM2.5 - 21<br/>PM10 - 9<br/>O3 - 7<br/>NO2 - 1<br/>SO2 - 1");
  }

}
