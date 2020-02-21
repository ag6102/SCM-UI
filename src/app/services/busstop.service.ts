import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import config from '../../assets/config/dev-config.json';

@Injectable({
  providedIn: 'root'
})
export class BusStopService {
  
  // baseURL = config.API_ENDPOINTS.BASE_URL + "/busstop";
  baseURL = "http://10.6.61.166:8000/data/busstop/";

  constructor(private httpClient: HttpClient) { }

  fetchBusStopDetails(){
    return this.httpClient.get(this.baseURL, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
           'Authorization': localStorage.getItem('token')
         })
      });
  }
}
