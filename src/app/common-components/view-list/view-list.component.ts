import { Component, OnInit, Input } from "@angular/core";
import { AlertsService } from "../../services/alerts.service";
declare let Pusher: any;
@Component({
  selector: "app-view-list",
  templateUrl: "./view-list.component.html",
  styleUrls: ["./view-list.component.css"],
})
export class ViewListComponent implements OnInit {
  listData;
  test: String = "Testing";

  constructor(private alertsService: AlertsService) {}

  ngOnInit() {
    this.alertsService.fetchAlerts().subscribe((response: []) => {
      this.listData = response.sort((a, b) => {
        return (
          new Date(b["timestamp"]).getTime() -
          new Date(a["timestamp"]).getTime()
        );
      });
    });
  }

  forwardRequest(item) {
    item.status = "Forwarded";
    this.alertsService.updateAlert(item).subscribe((v) => {});
  }
}
