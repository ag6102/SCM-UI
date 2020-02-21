  import { Component, OnInit } from '@angular/core';
  // import {Router} from '@angular/router';
  import { AuthenticationService } from '../../services/authentication.service';
  import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

  @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {

  form: FormGroup;
  userDetails = {
    'username' : 'email@gmail.com',
    'password' : 'password'
  }
  showError:Boolean = false;
  submitted = false;

  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) { }
  // constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.controls.email.value);
    this.authenticationService.authenticateUser(this.userDetails).subscribe((response)=>{
      this.showError = false;
      localStorage.setItem('token', response['data'].token);
      // this.router.navigateByUrl('dashboard');
    }, (error) => {
      this.showError = true;
    });
  }

  }
