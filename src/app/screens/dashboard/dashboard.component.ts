import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CacheService } from "../../services/cache.service";
import { interval } from "rxjs/internal/observable/interval";
import { startWith, switchMap } from "rxjs/operators";
import { CacheData } from "../../models/cache-data.model";

declare let Pusher: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  alertData = {};
  showAlert: Boolean = false;
  cacheData: CacheData;

  constructor(private router: Router, private cacheService: CacheService) {}

  ngOnInit() {
    var pusher = new Pusher("fe5bdaff7e445663f02e", {
      cluster: "eu",
      forceTLS: true
    });

    var channel = pusher.subscribe("notification-channel");
    channel.bind("notification-event", this.pushNotification.bind(this));
    if (!localStorage.getItem("token")) {
      this.router.navigateByUrl("login");
    }
    this.alertData = {
      message: "Pollution alert : High in Dublin 3",
      action: ["Cancel", "Take Action"]
    };
  }
  pushNotification() {
    console.log("up");
    this.showAlert = true;
  }
  updateAlertFlag() {
    this.showAlert = false;
    let obj = {
      isAlertPresent: false
    };
    this.cacheService.updateCacheData(obj).subscribe(v => {});
  }
}
