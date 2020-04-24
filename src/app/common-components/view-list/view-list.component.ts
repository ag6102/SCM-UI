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
  isAdmin = localStorage.getItem("role") == "admin";

  constructor(private alertsService: AlertsService) {}

  ngOnInit() {
    this.alertsService.fetchAlerts().subscribe((response: []) => {
      var temp: {}[] = response.sort((a, b) => {
        return (
          new Date(b["timestamp"]).getTime() -
          new Date(a["timestamp"]).getTime()
        );
      });
      var permits = JSON.parse(localStorage.getItem("permits"));
      var permissions = [];
      if (permits) {
        const keys = Object.keys(permits);
        for (var i = 0; i < keys.length; i++) {
          if (permits[keys[i]] == true) {
            permissions.push(keys[i]);
          }
        }
      }
      for (var i = 0; i < temp.length; i++) {
        temp[i]["type"] = temp[i]["type"].split(",");
      }
      temp = temp.filter((a) => {
        if (!this.isAdmin) {
          var types = a["type"];
          var havePermission: Boolean = false;
          for (var p = 0; p < permissions.length; p++) {
            if (types.indexOf(permissions[p]) != -1) havePermission = true;
          }
          return havePermission;
        } else return true;
      });
      this.listData = temp;
    });
  }

  forwardRequest(item) {
    item.status = "Forwarded";
    this.alertsService.updateAlert(item).subscribe((v) => {});
  }
}
