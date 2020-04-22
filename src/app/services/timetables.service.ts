import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import config from "../../assets/config/dev-config.json";

@Injectable({
  providedIn: "root",
})
export class TimetablesService {
  //baseURL = "http://10.6.61.166:8000/data/irishrailstop/";

  constructor(private httpClient: HttpClient) {}

  getIrishRailTimetable(searchkey: string) {
    let baseURL = config.TIMETABLE_APIS.IRISHRAIL + searchkey;
    return this.httpClient.get(baseURL, { responseType: "text" });
  }

  getBusTimetable(searchkey) {
    let baseURL = config.TIMETABLE_APIS.BUS + searchkey;
    return this.httpClient.get(baseURL, {
      responseType: "text",
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  getLuasTimetable(searchkey: string) {
    let baseURL = config.TIMETABLE_APIS.LUAS + searchkey;
    return this.httpClient.get(baseURL, {
      responseType: "text",
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  fetchTimetable(serviceType: string, searchkey) {
    let request;
    switch (serviceType) {
      case "irishrailstop":
        request = this.getIrishRailTimetable(searchkey);
        return request;
        break;
      case "busstop":
        request = this.getBusTimetable(searchkey);
        return request;
        break;
      case "luasstop":
        request = this.getLuasTimetable(searchkey);
        return request;
        break;
      default:
        break;
    }
  }
}
