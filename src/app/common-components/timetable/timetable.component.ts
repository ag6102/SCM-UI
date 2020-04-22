import {
  Component,
  OnInit,
  NgModule,
  EventEmitter,
  Output,
  Inject,
} from "@angular/core";
import {
  MatDialogRef,
  MatIcon,
  MatGridTile,
  MAT_DIALOG_DATA,
} from "@angular/material";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from "@angular/forms";
import { ThrowStmt } from "@angular/compiler";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import config from "../../../assets/config/dev-config.json";
import { PredictionService } from "src/app/services/prediction.service.js";

@NgModule({
  declarations: [TimetableComponent],
  imports: [MatIcon, MatGridTile],
  providers: [],
})
@Component({
  selector: "app-timetable",
  templateUrl: "./timetable.component.html",
  styleUrls: ["./timetable.component.css"],
})
export class TimetableComponent implements OnInit {
  targetStation = [];
  targetInfo = [];
  name: "";
  cordData: null;
  serviceType;
  multi = [];
  noData = false;

  view: any[] = [400, 350];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = "Time";
  yAxisLabel: string = "Bike Availability";
  timeline: boolean = true;

  colorScheme = {
    domain: ["#5AA454", "#E44D25", "#CFC0BB", "#7aa3e5", "#a8385d", "#aae3f5"],
  };

  constructor(
    public dialogRef: MatDialogRef<TimetableComponent>,
    private formBuilder: FormBuilder,
    private predictionService: PredictionService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data.type === "irishrailstop") {
      this.handleIrishRailData();
    } else if (this.data.type === "busstop") {
      this.handleBusStopData();
    } else if (this.data.type === "bike") {
      this.handleBikeData();
    } else if (this.data.type === "pollution") {
      this.handlePollutionData();
    }
  }

  handleBusStopData() {
    this.name = this.data.name;
    this.serviceType = "Buses";
    let timetable = JSON.parse(this.data.timetable);
    let busStandName = this.data.standName;
    let stopId = timetable["stopid"];
    if (timetable["results"] && timetable["results"].length > 0) {
      this.targetInfo = timetable["results"].map((node, index) => {
        return {
          origin: busStandName,
          originTime: node["scheduledarrivaldatetime"],
          dest: node["destination"],
          destTime: "",
          dueIn: node["duetime"],
          late: 2,
          route: "Route No- " + node["route"],
          image: "../../../assets/images/bus.png",
        };
      });
    }
  }

  handleIrishRailData() {
    let stationData = JSON.parse(
      localStorage.getItem("irishrailstopTimetable")
    )["schedule"];
    this.name = this.data.name;
    this.serviceType = "Trains";
    for (let i = 0; i < stationData.length; i++) {
      let currentStation =
        stationData[i]["ArrayOfObjStationData"]["objStationData"];
      if (currentStation && Array.isArray(currentStation)) {
        if (
          currentStation[0]["Stationfullname"].toLowerCase().trim() ===
          this.data.name.toLowerCase().trim()
        ) {
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
          image:
            node["Traintype"].toLowerCase().trim() == "dart"
              ? "../../../assets/images/dart.png"
              : "../../../assets/images/irail.png",
        };
      });
    }
  }

  handleBikeData() {
    this.name = this.data.name.standName;
    this.serviceType = "Bike";
    this.yAxisLabel = "Bike Availability";
    this.predictionService
      .fetchBikePrediction(this.name)
      .subscribe((response) => {
        this.noData = false;
        var temp = [];
        var dateObj = null;
        for (let [key, value] of Object.entries(response)) {
          if (!dateObj) {
            dateObj = new Date();
          } else {
            dateObj = new Date(dateObj.getTime() + 15 * 60000);
          }
          console.log(`${key}: ${value}`);
          temp.push({
            name: dateObj,
            value: value,
          });
        }
        this.multi.push({
          name: "Bike",
          series: temp,
        });
        this.multi = [...this.multi];
      });
  }

  handlePollutionData() {
    this.name = this.data.name.standName;
    console.log(this.data.name);
    this.serviceType = "Pollution";
    this.yAxisLabel = "Air Quality Index";
    this.predictionService
      .fetchPollutinPrediction(this.data.name.cordinate)
      .subscribe(
        (response) => {
          this.noData = false;
          var temp = [];
          var dateObj = null;
          for (let [key, value] of Object.entries(response)) {
            if (!dateObj) {
              dateObj = new Date();
            } else {
              dateObj = new Date(dateObj.getTime() + 15 * 60000);
            }
            console.log(`${key}: ${value}`);
            temp.push({
              name: dateObj,
              value: value,
            });
          }
          this.multi.push({
            name: "Bus",
            series: temp,
          });
          this.multi = [...this.multi];
        },
        (error) => {
          this.noData = true;
        }
      );
  }
}
