import { Injectable } from '@angular/core';
import config from '../../assets/config/dev-config.json';
import { HttpHelperService } from './http-helper.service.js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseURL = config.API_ENDPOINTS.AUTH_URL + "/login/";

  constructor(private httpHelper: HttpHelperService) { }

  authenticateUser(userObj){
    return this.httpHelper.post(this.baseURL,userObj);
  }
}
