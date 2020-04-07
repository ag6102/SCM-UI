import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpHelperService } from "./http-helper.service.js";

import config from "../../assets/config/dev-config.json";

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(private httpClient: HttpHelperService) { }

  sendNotification(bundle) {
    let url = config.API_ENDPOINTS.BASE_URL + "notify";
    return this.httpClient.post(url, JSON.parse(bundle));
  }
}
