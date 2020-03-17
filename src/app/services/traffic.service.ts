import { Injectable } from "@angular/core";
import config from "../../assets/config/dev-config.json";
import { HttpHelperService } from "./http-helper.service.js";

@Injectable({
  providedIn: "root"
})
export class TrafficService {
  baseURL = config.API_ENDPOINTS.BASE_URL + "/traffic";

  constructor(private httpClient: HttpHelperService) {}

  fetchTrafficDetails() {
    return this.httpClient.get(this.baseURL);
  }
}
