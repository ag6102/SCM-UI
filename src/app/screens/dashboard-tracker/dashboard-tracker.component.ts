import { Component, OnInit } from '@angular/core';
import { PollutionService } from '../../services/pollution.service';
import { BikesService } from '../../services/bikes.service';
import { TrafficService } from '../../services/traffic.service';

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
  bikesDetails;
  interval;
  selected = 'traffic';

  constructor(private pollutionService: PollutionService, private bikesService: BikesService, private trafficService: TrafficService) { }

  ngOnInit() {
    let coordinates = [[53.3895286,-6.1190612], [52.3895286,-6.1190612]];
    // this.fetchLatestPollutionDetails();
    this.fetchTrafficData();
    // this.interval = setInterval(() => {
    //   this.fetchLatestPollutionDetails();
    // }, 1800000);
  }

  fetchAllLatLong(){
    this.pollutionService.fetchAllPollutionLatLongs().subscribe((response)=>{
      this.latLongList = response;
     });
  }

  fetchLatestPollutionDetails(){
    this.selected = 'pollution';
    this.pollutionService.fetchPollutionDetails().subscribe((response)=>{
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
      type : 'pollution'
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

  fetchLatestBikesData(){
    this.selected = 'bike';
    this.bikesService.fetchBikeDetails().subscribe((response)=>{
      this.bikesDetails = response;
      let bCoordinates = [] ;
    for(var i=0; i < this.bikesDetails.length; i++){
      bCoordinates.push({
        cordinate : [this.bikesDetails[i].lat, this.bikesDetails[i].long],
        status : this.bikesDetails[i].status,
        availableBikes : this.bikesDetails[i].available_bikes,
        availableBikeStands : this.bikesDetails[i].available_bike_stands,
        bikeStands : this.bikesDetails[i].bike_stands
      });
      
    }
    let mapsJson = {
      coordinates : bCoordinates,
      type : 'bike'
    };
    this.alertListData = [];
    this.mapsData = mapsJson;
    });
  }

  fetchTrafficData(){
    this.selected = 'traffic';
    this.trafficService.fetchTrafficDetails().subscribe((response)=>{
    //   this.bikesDetails = response;
    //   let bCoordinates = [] ;
    // for(var i=0; i < this.bikesDetails.length; i++){
    //   bCoordinates.push({
    //     cordinate : [this.bikesDetails[i].lat, this.bikesDetails[i].long],
    //     status : this.bikesDetails[i].status,
    //     availableBikes : this.bikesDetails[i].available_bikes,
    //     availableBikeStands : this.bikesDetails[i].available_bike_stands,
    //     bikeStands : this.bikesDetails[i].bike_stands
    //   });
      
    // }
    let mapsJson = {
      coordinates : response,
      type : 'traffic'
    };
    this.alertListData = [];
    this.mapsData = mapsJson;
    });
  }

}
