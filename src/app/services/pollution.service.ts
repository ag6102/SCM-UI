import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {

  baseURL = "http://10.6.39.251:8000/polls/";

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
