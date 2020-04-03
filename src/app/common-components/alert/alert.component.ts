import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CacheData } from "../../models/cache-data.model";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"]
})
export class AlertComponent implements OnInit {
  @Input() alertData: Object;
  @Input() showAlert: Boolean = false;
  @Output() updateAlertFlag = new EventEmitter();
  cacheData: CacheData;

  constructor() {}

  ngOnInit() {}

  hideAlert() {
    this.showAlert = false;
    this.updateAlertFlag.emit();
  }
}
