import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BikesService {

  // baseURL = "http://10.6.57.189:8000/data/bike/";
  // baseURL = "http://10.6.57.189:8000/data/bike/";
  baseURL = "http://10.6.57.211:8000/data/bike/";
  // baseURL = "http://10.6.45.76:8000/data/bike/";

  constructor(private httpClient: HttpClient) { }

  fetchBikeDeatils(){
    return this.httpClient.get(this.baseURL, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
      });
  }
}
