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
  constructor(
    public dialogRef: MatDialogRef<TimetableComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    
  }
}

