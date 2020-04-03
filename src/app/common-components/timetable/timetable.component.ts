import {
  Component,
  OnInit,
  NgModule,
  EventEmitter,
  Output,
  Inject
} from "@angular/core";
import {
  MatDialogRef,
  MatIcon,
  MatGridTile,
  MAT_DIALOG_DATA
} from "@angular/material";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl
} from "@angular/forms";
import { ThrowStmt } from '@angular/compiler';

@NgModule({
  declarations: [TimetableComponent],
  imports: [MatIcon, MatGridTile],
  providers: []
})
@Component({
  selector: "app-timetable",
  templateUrl: "./timetable.component.html",
  styleUrls: ["./timetable.component.css"]
})
export class TimetableComponent implements OnInit {

  targetStation = [];
  targetInfo = [];
  name: '';
  serviceType;

  constructor(
    public dialogRef: MatDialogRef<TimetableComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data.type === "irishrailstop") {
      this.handleIrishRailData();
    }
    else if(this.data.type === "busstop"){
      this.handleBusStopData();
    }
  }

  handleBusStopData() {
    this.name = this.data.name;
    this.serviceType = "Buses";
    let timetable = JSON.parse(this.data.timetable);
    let busStandName = this.data.standName;
    let stopId = timetable["stopid"];
    console.log(stopId)
    if (timetable["results"] && timetable["results"].length > 0) {
      this.targetInfo = timetable["results"].map((node, index) => {
        return {
          origin: busStandName,
          originTime: node["scheduledarrivaldatetime"],
          dest: node["destination"],
          destTime: "",
          dueIn: node["duetime"],
          late: 2,
          route: "Route No- "+node["route"],
          image: "../../../assets/images/bus.png"
        };
      });
    }
  }

  handleIrishRailData() {
    let stationData = JSON.parse(localStorage.getItem("irishrailstopTimetable"))[
      "schedule"
    ];
    this.name = this.data.name;
    this.serviceType = "Trains";
    for (let i = 0; i < stationData.length; i++) {
      let currentStation = stationData[i]['ArrayOfObjStationData']['objStationData'];
      if (currentStation && Array.isArray(currentStation)) {
        if (currentStation[0]["Stationfullname"].toLowerCase().trim() ===
          this.data.name.toLowerCase().trim()) {
          this.targetStation.push(currentStation);
        }
      }
    }
    console.log("Target station:", this.targetStation);
    this.extractInfoFromTargetStation();
  }

  extractInfoFromTargetStation() {
    if (this.targetStation && this.targetStation.length > 0) {
      this.targetInfo = this.targetStation[0].map((node, index) => {
        return {
          origin: node["Stationfullname"],
          originTime: node["Exparrival"],
          dest: node["Destination"],
          destTime: node["Destinationtime"],
          dueIn: node["Duein"],
          late: node["Late"],
          image: node["Traintype"].toLowerCase().trim() == 'dart' ? "../../../assets/images/dart.png" : "../../../assets/images/irail.png"
        };
      });
    }
  }

}

