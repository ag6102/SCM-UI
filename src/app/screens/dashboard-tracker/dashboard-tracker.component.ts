import { Component, OnInit } from '@angular/core';
import { PollutionService } from '../../services/pollution.service';

@Component({
  selector: 'app-dashboard-tracker',
  templateUrl: './dashboard-tracker.component.html',
  styleUrls: ['./dashboard-tracker.component.css']
})
export class DashboardTrackerComponent implements OnInit {

  mapsData: Object = {};
  alertListData = [];
  latLongList;
  pollutionDetails;

  constructor(private pollutionService: PollutionService) { }

  ngOnInit() {
    // let coordinates = this.fetchAllLatLong();
    let coordinates = [[53.3895286,-6.1190612], [52.3895286,-6.1190612]];
    // let pollutionData = coordinates.forEach(element => {
    //   return this.fetchLatestPollutionDetails(element);
    // });
    this.fetchLatestPollutionDetails();
  }

  fetchAllLatLong(){
    this.pollutionService.fetchAllPollutionLatLongs().subscribe((response)=>{
      console.log(response);
      this.latLongList = response;
     });
  }

  fetchLatestPollutionDetails(){
    this.pollutionService.fetchPollutionDeatils().subscribe((response)=>{
      console.log(response);
      this.pollutionDetails = response;
      let pCoordinates = [] ;
    for(var i=0; i < this.pollutionDetails.length; i++){
      pCoordinates.push({
        cordinate : [this.pollutionDetails[i].lat, this.pollutionDetails[i].long],
        msg : this.pollutionDetails[i].index_irl_epa.category,
        color : this.pollutionDetails[i].index_irl_epa.color,
        aqi_display : this.pollutionDetails[i].index_irl_epa.aqi_display
      });
      
    }
    let mapsJson = {
      coordinates : pCoordinates,
      center : [53.343792,-6.254572],
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
    });
  }

}
