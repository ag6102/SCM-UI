import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  alertData = {};
  showAlert: Boolean = true;

  constructor() { }

  ngOnInit() {
    this.alertData = {
      'message': 'Pollution alert : High in Dublin 3',
      'action' : ['Cancel', 'Take Action']
    };
  }

}
