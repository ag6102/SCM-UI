import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import config from '../../assets/config/dev-config.json';

@Injectable({
  providedIn: 'root'
})
export class BikesService {
  
  // baseURL = config.API_ENDPOINTS.BASE_URL + "/bikes";
  baseURL = "http://192.168.1.123:8000/data/bike/";

  constructor(private httpClient: HttpClient) { }

  fetchBikeDetails(){
    return this.httpClient.get(this.baseURL, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
           'Authorization': localStorage.getItem('token')
         })
      });
  }
}