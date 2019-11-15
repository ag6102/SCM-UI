import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-tracker',
  templateUrl: './dashboard-tracker.component.html',
  styleUrls: ['./dashboard-tracker.component.css']
})
export class DashboardTrackerComponent implements OnInit {

  mapsData: Object = {};
  alertListData = [];

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
    this.alertListData = [
      {
        id : '42343243',
        time : '23/10/2019 12:00:43',
        desc : 'Test Test Test Test', 
        criticality : 'High',
        action : 'Test'
      },
      {
        id : '74553423',
        time : '23/10/2019 12:00:43',
        desc : 'Test Test Test Test', 
        criticality : 'High',
        action : 'Test'
      },
      {
        id : '324346',
        time : '23/10/2019 12:00:43',
        desc : 'Test Test Test Test', 
        criticality : 'High',
        action : 'Test'
      },
      {
        id : '324346',
        time : '23/10/2019 12:00:43',
        desc : 'Test Test Test Test', 
        criticality : 'High',
        action : 'Test'
      },
      {
        id : '324346',
        time : '23/10/2019 12:00:43',
        desc : 'Test Test Test Test', 
        criticality : 'High',
        action : 'Test'
      },
      {
        id : '324346',
        time : '23/10/2019 12:00:43',
        desc : 'Test Test Test Test', 
        criticality : 'High',
        action : 'Test'
      }
    ]
    this.mapsData = mapsJson;
  }

}
