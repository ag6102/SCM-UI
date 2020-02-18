import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  alertData = {};
  showAlert: Boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    if(!localStorage.getItem('token')){
      this.router.navigateByUrl('login');
    }
    this.alertData = {
      'message': 'Pollution alert : High in Dublin 3',
      'action' : ['Cancel', 'Take Action']
    };
  }

}
