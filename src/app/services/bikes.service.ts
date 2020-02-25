import { Injectable } from '@angular/core';
import config from '../../assets/config/dev-config.json';
import { HttpHelperService } from './http-helper.service.js';

@Injectable({
  providedIn: 'root'
})
export class BikesService {
  
  baseURL = config.API_ENDPOINTS.BASE_URL + "/bikes";

  constructor(private httpClient: HttpHelperService) { }

  fetchBikeDetails(){
    return this.httpClient.get(this.baseURL);
  }
}
