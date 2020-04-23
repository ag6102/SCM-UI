import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-message-dialog",
  templateUrl: "./message-dialog.component.html",
  styleUrls: ["./message-dialog.component.css"],
})
export class MessageDialogComponent implements OnInit {
  @Output() emitService = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  closeDialog() {
    this.emitService.emit();
  }
}
