import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import config from '../../assets/config/dev-config.json';

@Injectable({
  providedIn: 'root'
})
export class TimetablesService {
  
  //baseURL = "http://10.6.61.166:8000/data/irishrailstop/";

  constructor(private httpClient: HttpClient) { }

  getIrishRailTimetable(searchkey:string)
  {
    let baseURL = config.TIMETABLE_APIS.IRISHRAIL+searchkey;
    return this.httpClient.get(baseURL, {
        headers: new HttpHeaders({
             'Content-Type':  'application/xml',           
           })
        });
  }

  fetchTimetable(serviceType:string, searchkey:string){
    switch(serviceType)
    {
        case "irishrail":
            let request =  this.getIrishRailTimetable(searchkey);
            return request;
            break;

    }
  }
}
