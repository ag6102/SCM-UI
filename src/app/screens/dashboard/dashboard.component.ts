import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CacheService } from "../../services/cache.service";
import { interval } from "rxjs/internal/observable/interval";
import { startWith, switchMap } from "rxjs/operators";
import { CacheData } from "../../models/cache-data.model";
import { AuthenticationService } from "../../services/authentication.service";
import { Ability } from "@casl/ability";
import { defineAbilitiesFor } from "../../ability";

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

  constructor(
    private router: Router,
    private cacheService: CacheService,
    private authenticationService: AuthenticationService,
    private ability: Ability
  ) {}

  ngOnInit() {
    if (!localStorage.getItem("token")) {
      this.router.navigateByUrl("login");
    }
    this.authenticationService.checkAuthentication().subscribe(
      response => {
        localStorage.setItem(
          "permits",
          JSON.stringify(response["user"]["permits"])
        );
        localStorage.setItem("role", response["user"]["role"]);
        this.ability.update(defineAbilitiesFor(response["user"]["role"]));
        var pusher = new Pusher("fe5bdaff7e445663f02e", {
          cluster: "eu",
          forceTLS: true
        });
        var channel = pusher.subscribe("notification-channel");
        if (response["user"]["role"] == "admin") {
          channel.bind("to-admin", this.pushNotification.bind(this));
        } else {
          channel.bind("to-service-provider", this.pushNotification.bind(this));
        }
      },
      error => {
        this.router.navigateByUrl("login");
      }
    );
    this.alertData = {
      message: "Pollution alert : High in Dublin 3",
      action: ["Cancel", "Take Action"]
    };
  }

  pushNotification() {
    this.showAlert = true;
  }

  updateAlertFlag() {
    this.showAlert = false;
    let obj = {
      isAlertPresent: false
    };
    this.cacheService.updateCacheData(obj).subscribe(v => {});
  }

  navIconClicked(event) {
    if (event.data == "/dashboard/alerts") {
      this.updateAlertFlag();
    }
  }
}
