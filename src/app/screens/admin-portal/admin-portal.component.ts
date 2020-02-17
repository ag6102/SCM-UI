import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {

  userDetails = {
    "email": "",
    "password": "",
    "first_name":"",
    "last_name":"",
    "role":"n",
    "permits":{
     "bike":false,
     "dart":false,
     "luas":false,
     "bus":false,
     "traffic":false,
     "pollution":false
    }
  }
  constructor() { }

  ngOnInit() {
  }

  signupNewUser(){

  }



}
