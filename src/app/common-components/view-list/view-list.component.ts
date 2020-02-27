import { Component, OnInit, Input } from '@angular/core';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit {

  listData; 
  test: String = 'Testing';

  constructor(private alertsService: AlertsService) { }

  ngOnInit() {
    this.alertsService.fetchAlerts().subscribe((v) => {
      this.listData = v;
    });
  }

  forwardRequest(item){
    console.log(item);
    item.status = "Forwarded";
    console.log(item);
    this.alertsService.updateAlert(item).subscribe((v) => {
      console.log(v);
    });
  }

}
