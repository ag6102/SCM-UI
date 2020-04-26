import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CacheService } from "../../services/cache.service";
import { interval } from "rxjs/internal/observable/interval";
import { startWith, switchMap } from "rxjs/operators";
import { CacheData } from "../../models/cache-data.model";
import { AuthenticationService } from "../../services/authentication.service";
import { Ability } from "@casl/ability";
import { defineAbilitiesFor } from "../../ability";
import { AlertDataInterface } from "src/app/interfaces/common-interfaces";

declare let Pusher: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  alertData: AlertDataInterface;
  showAlert: Boolean = false;
  cacheData: CacheData;
  userobj = {
    firstname: "",
    lastname: "",
    role: "",
  };

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
      (response) => {
        localStorage.setItem(
          "permits",
          JSON.stringify(response["user"]["permits"])
        );
        this.userobj.firstname = response["user"]["first_name"];
        this.userobj.lastname = response["user"]["last_name"];
        this.userobj.role = response["user"]["role"];
        localStorage.setItem("role", response["user"]["role"]);
        this.ability.update(defineAbilitiesFor(response["user"]["role"]));
        var pusher = new Pusher("fe5bdaff7e445663f02e", {
          cluster: "eu",
          forceTLS: true,
        });
        var channel = pusher.subscribe("notification-channel");
        var that = this;
        if (response["user"]["role"] == "admin") {
          channel.bind("to-admin", function (data) {
            that.pushNotification(data);
          });
        } else {
          channel.bind("to-service-provider", function (data) {
            that.pushNotification(data);
          });
          channel.bind("notification-event", function (data) {
            that.pushNotification(data);
          });
        }
      },
      (error) => {
        this.router.navigateByUrl("login");
      }
    );
  }

  pushNotification(data) {
    this.alertData = {
      message: data,
      action: ["Take Action"],
    };
    this.showAlert = true;
  }

  updateAlertFlag() {
    this.showAlert = false;
    let obj = {
      isAlertPresent: false,
    };
    this.cacheService.updateCacheData(obj).subscribe((v) => {});
  }

  navIconClicked(event) {
    if (event.data == "/dashboard/alerts") {
      this.updateAlertFlag();
    }
  }
}
