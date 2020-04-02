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
    let xmlString = JSON.parse(localStorage.getItem("irishrailstopTimetable"))[
      "schedule"
    ];
    let parser = new DOMParser();
    let parsed = parser.parseFromString(xmlString, "application/xml");
    console.log(parsed);
    this.name = this.data.name;
    let allStations = parsed.getElementsByTagName("objStationData");
    for (let i = 0; i < allStations.length; i++) {
      let currentStation = allStations[i];
      let stationName = currentStation.getElementsByTagName("Stationfullname");
      if (
        stationName[0].textContent.toLowerCase().trim() ===
        this.data.name.toLowerCase().trim()
      ) {
        this.targetStation.push(currentStation);
      }
    }
    this.extractInfoFromTargetStation();
  }

  extractInfoFromTargetStation() {
    if (this.targetStation && this.targetStation.length > 0) {
      this.targetInfo = this.targetStation.map(node => {
        return {
          origin: node.getElementsByTagName("Origin")[0].textContent,
          originTime: node.getElementsByTagName("Origintime")[0].textContent,
          dest: node.getElementsByTagName("Destination")[0].textContent,
          destTime: node.getElementsByTagName("Destinationtime")[0].textContent,
          dueIn: node.getElementsByTagName("Duein")[0].textContent,
          late: node.getElementsByTagName("Late")[0].textContent,
          image: node.getElementsByTagName("Traintype")[0].textContent.toLowerCase().trim() == 'dart' ? "../../../assets/images/dart.png" : "../../../assets/images/irail.png"
        };
      });
    }
  }

}

