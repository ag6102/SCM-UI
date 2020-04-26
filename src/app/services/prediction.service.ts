import { Injectable } from "@angular/core";
import config from "../../assets/config/dev-config.json";
import { HttpHelperService } from "./http-helper.service.js";

@Injectable({
  providedIn: "root",
})
export class PredictionService {
  constructor(private httpClient: HttpHelperService) {}

  fetchBikePrediction(payload) {
    return this.httpClient.get(
      config.ANALYSIS_API_ENDPOINTS.ANALYSIS +
        "/bikeprediction/?stop=" +
        payload,
      true
    );
  }
  fetchPollutinPrediction(payload) {
    return this.httpClient.get(
      config.ANALYSIS_API_ENDPOINTS.ANALYSIS +
        "/pollutionprediction/?lat=" +
        payload[0] +
        "&lng=" +
        payload[1],
      true
    );
  }
}
