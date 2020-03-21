import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from "../../assets/config/dev-config.json";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  sendNotification(bundle) {
    let url = config.API_ENDPOINTS.DEV_SERVER_BASE + "notify";
    return this.httpClient.post(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      params: JSON.parse(bundle),
      responseType: "json"
    });
  }
}
