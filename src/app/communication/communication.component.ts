import { Component, OnInit, NgModule, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialogRef, MatIcon, MatGridTile, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';


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
  
  @Output() emitService = new EventEmitter()
  
  constructor(public dialogRef: MatDialogRef<CommunicationComponent>, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  
  ngOnInit() {
    this.infoDispatchForm = this.formBuilder.group({
      message: ['', Validators.required],
      coordinates: [this.data.lat.toFixed(3) + ',  ' + this.data.lng.toFixed(3), Validators.required],
      to_services: [''],
      priority: ['']
    });
  }

  onSubmit(e, infoBundle) {
    e.preventDefaults();
    if (infoBundle.message && infoBundle.coordintes) {
      this.submitted = true;
      this.emitService.next("Sumit")  
    }
    
  }
}
