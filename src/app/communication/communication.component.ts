import { Component, OnInit, NgModule, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialogRef, MatIcon, MatGridTile, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';


@NgModule({
  declarations: [
    CommunicationComponent
  ],
  imports: [
    MatIcon, MatGridTile
  ],
  providers: []
})
@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})

  
  
export class CommunicationComponent implements OnInit {

  infoDispatchForm: FormGroup;
  showError: Boolean = false;
  submitted = false;

  shouldSendToBus = true;
  shouldSendToDart = true;
  shouldSendToLuas = true;
  shouldSendToBikes = true;
  
  @Output() emitService = new EventEmitter()
  
  constructor(public dialogRef: MatDialogRef<CommunicationComponent>, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  
  ngOnInit() {
    this.infoDispatchForm = this.formBuilder.group({
      message: ['', Validators.required],
      coordinates: [this.data.lat.toFixed(3) + ',  ' + this.data.lng.toFixed(3), Validators.required],
      to_services: [''],
      priority: [''],
      busCheckbox: new FormControl(true)
    });
    this.infoDispatchForm.controls['coordinates'].disable();
  }

  onSubmit() {  
    if (this.infoDispatchForm.valid) {
      this.emitService.next(JSON.stringify(this.infoDispatchForm.value))
    }
    
  }
}
