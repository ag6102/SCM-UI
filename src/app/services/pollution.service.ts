import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import config from '../../assets/config/dev-config.json';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {

  // baseURL = config.API_ENDPOINTS.BASE_URL + "/polls";
  baseURL = "http://10.6.61.166:8000/data/polls/";
  constructor(private httpClient: HttpClient) { }

  fetchAllPollutionLatLongs(){
    return this.httpClient.get(this.baseURL, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
           'Authorization': localStorage.getItem('token')
         })
      });
  }
  fetchPollutionDetails(): Observable<Object> {
    return this.httpClient.get(this.baseURL, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
           'Authorization': localStorage.getItem('token')
         })
      });
  }
}
