import { Injectable } from '@angular/core';
import config from '../../assets/config/dev-config.json';
import { HttpHelperService } from './http-helper.service.js';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  baseURL = config.API_ENDPOINTS.BASE_URL + "/alerts";

  constructor(private httpClient: HttpHelperService) { }

  fetchAlerts(){
    return this.httpClient.get(this.baseURL);
  }

  updateAlert(obj){
    return this.httpClient.post(this.baseURL, obj);
  }
}
