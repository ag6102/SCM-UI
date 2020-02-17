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
    'username' : '',
    'password' : ''
  }
  showError:Boolean = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }
  // constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    // if(this.userDetails.username && this.userDetails.password){
    //   this.authenticationService.authenticateUser(this.userDetails).subscribe((response)=>{
    //     this.showError = false;
    //     localStorage.setItem('token', response['data'].token);
    //     // this.router.navigateByUrl('dashboard');
    //   }, (error) => {
    //     this.showError = true;
    //   });
    // }else{
    //   this.showError = true;
    // }
  }

}
