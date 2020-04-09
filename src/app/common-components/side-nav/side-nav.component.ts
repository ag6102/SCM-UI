import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.css"]
})
export class SideNavComponent implements OnInit {
  selected = "dashboard/tracker";
  @Output()
  navIconClicked = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit() {
    this.selected = window.location.pathname;
  }

  navRedirect(pageName) {
    this.navIconClicked.emit({ event: event, data: pageName });
    if (pageName == "login") {
      localStorage.removeItem("token");
    }
    this.router.navigateByUrl(pageName);
    this.selected = pageName;
  }
}
