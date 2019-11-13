import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-tracker',
  templateUrl: './dashboard-tracker.component.html',
  styleUrls: ['./dashboard-tracker.component.css']
})
export class DashboardTrackerComponent implements OnInit {

  mapsData: Object = {};

  constructor() { }

  ngOnInit() {
    let coordinates = [[53.3895286,-6.1190612], [52.3895286,-6.1190612]];
    let mapsJson = {
      coordinates : [
        {
          cordinate : [53.3895286,-6.1190612],
          msg: 'Test',
          color: 'green'
        },
        {
          cordinate : [52.3895286,-6.1190612],
          msg: 'Test2',
          color: 'yellow'
        }
      ],
      center : [53.3895286,-6.1190612],
    };
    this.mapsData = mapsJson;
  }

}
