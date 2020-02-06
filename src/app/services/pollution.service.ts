import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {

  // baseURL = "http://10.6.57.189:8000/data/polls/";
  baseURL = "http://10.6.57.211:8000/data/polls/";
  // baseURL = "http://10.6.34.43:8000/data/polls/";
  // baseURL = "http://10.6.45.76:8000/data/polls/";

  constructor(private httpClient: HttpClient) { }

  fetchAllPollutionLatLongs(){
    return this.httpClient.get(this.baseURL, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
      });
  }
  fetchPollutionDeatils(): Observable<Object> {
    return this.httpClient.get(this.baseURL, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
      });
  }
}
