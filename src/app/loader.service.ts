import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  isLoading = new Subject<boolean>();

  constructor() {}

  show() {
    this.isLoading.next(false);
  }
  hide() {
    this.isLoading.next(false);
  }
}
