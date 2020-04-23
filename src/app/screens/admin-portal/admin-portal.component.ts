import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
  FormGroupDirective,
  NgForm,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { MessageDialogComponent } from "src/app/common-components/message-dialog/message-dialog.component";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-admin-portal",
  templateUrl: "./admin-portal.component.html",
  styleUrls: ["./admin-portal.component.css"],
})
export class AdminPortalComponent implements OnInit {
  adminCreationForm: FormGroup;
  userDetails = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "n",
    permits: {
      bike: false,
      dart: false,
      luas: false,
      bus: false,
      traffic: false,
      pollution: false,
    },
  };
  matcher = null;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.adminCreationForm = this.formBuilder.group({
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      busCheckbox: new FormControl(true),
      dartCheckbox: new FormControl(true),
      bikesCheckbox: new FormControl(true),
      luasCheckbox: new FormControl(true),
    });
    this.matcher = new MyErrorStateMatcher();
  }

  onSubmit() {
    if (this.adminCreationForm.valid) {
      let bundle = this.adminCreationForm.value;
      var payload = {
        email: bundle.email,
        password: bundle.password,
        first_name: bundle.first_name,
        last_name: bundle.last_name,
        role: bundle.role,
        permits: {
          bike: bundle.bikesCheckbox,
          dart: bundle.dartCheckbox,
          luas: bundle.luasCheckbox,
          bus: bundle.busCheckbox,
          traffic: true,
          pollution: true,
        },
      };
      this.authenticationService.createNewUser(payload).subscribe(
        (response) => {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = false;
          dialogConfig.autoFocus = true;
          let modalRef = this.dialog.open(MessageDialogComponent, dialogConfig);
          modalRef.componentInstance.emitService.subscribe(() => {
            this.dialog.closeAll();
          });
          this.adminCreationForm.reset();
        },
        (error) => {
          console.log("Error while signing up.");
        }
      );
    }
  }
}
