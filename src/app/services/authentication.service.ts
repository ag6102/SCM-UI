import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import config from "../../assets/config/dev-config.json";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  baseURL = config.API_ENDPOINTS.AUTH_URL + "/login/";
  //baseURL = "http://10.6.61.166:8000/mongo_auth/login/";

  constructor(private httpClient: HttpClient) {}

  authenticateUser(userObj) {
    return this.httpClient.post(this.baseURL, userObj, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getUserPermissions() {
    let url = config.API_ENDPOINTS.DEV_SERVER_BASE + "/data/user"
    return this.httpClient.get(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      })
    });
  }

}
