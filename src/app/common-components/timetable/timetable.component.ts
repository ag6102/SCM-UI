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
  name: ''

  constructor(
    public dialogRef: MatDialogRef<TimetableComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data.type === "irishrailstop") {
      this.handleIrishRailData();
    }
  }

  handleIrishRailData() {
    let stationData = JSON.parse(localStorage.getItem("irishrailstopTimetable"))[
      "schedule"
    ];
    // console.log(stationData);
    this.name = this.data.name;
    // let allStations = stationData.getElementsByTagName("objStationData");
    for (let i = 0; i < stationData.length; i++) {
      let currentStation = stationData[i]['ArrayOfObjStationData']['objStationData'];
      if (currentStation[0]['Stationfullname'].toLowerCase().trim() === this.data.name.toLowerCase().trim()) 
      {
        console.log(currentStation);
        this.targetStation.push(currentStation);
      }
    }
    this.extractInfoFromTargetStation();
  }

  extractInfoFromTargetStation() {
    if (this.targetStation && this.targetStation.length > 0) {
      this.targetInfo = this.targetStation.map((node,index) => {
        // console.log(JSON.stringify(node));
        // debugger;
        return {
          origin: node[index]["Origin"],
          originTime: node[index]["Origintime"],
          dest: node[index]["Destination"],
          destTime: node[index]["Destinationtime"],
          dueIn: node[index]["Duein"],
          late: node[index]["Late"],
          image: node[index]["Traintype"].toLowerCase().trim() == 'dart' ? "../../../assets/images/dart.png" : "../../../assets/images/irail.png"
        };
      });
    }
  }

}

