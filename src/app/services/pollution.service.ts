import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import config from '../../assets/config/dev-config.json';
import { HttpHelperService } from './http-helper.service.js';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {

  baseURL = config.API_ENDPOINTS.BASE_URL + "/polls";
  constructor(private httpClient: HttpHelperService) { }

  fetchAllPollutionLatLongs(){
    return this.httpClient.get(this.baseURL);
  }
  fetchPollutionDetails(): Observable<Object> {
    return this.httpClient.get(this.baseURL);
  }
}
