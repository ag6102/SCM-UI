import { Component, OnInit } from '@angular/core';
 import {Router} from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

  @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showError:Boolean = false;
  submitted = false;

  //constructor(private formBuilder: FormBuilder) { }
  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder, private router:Router) { }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', Validators.required]
    });
  }

  onSubmit(loginCreds) {
    this.submitted = true;
     if(loginCreds.username && loginCreds.password){
       this.authenticationService.authenticateUser(loginCreds).subscribe((response)=>{
         this.showError = false;
         localStorage.setItem('token', response['data'].token);
          this.router.navigateByUrl('dashboard');
       }, (error) => {
         this.showError = true;
       });
     }else{
       this.showError = true;
     }
  }

}
