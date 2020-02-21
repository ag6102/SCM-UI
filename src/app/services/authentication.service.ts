import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import config from '../../assets/config/dev-config.json';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // baseURL = config.API_ENDPOINTS.BASE_URL + "/bikes";
  baseURL = "https://scm-be.herokuapp.com/mongo_auth/login/";

  constructor(private httpClient: HttpClient) { }

  authenticateUser(userObj){
    return this.httpClient.post(this.baseURL,userObj, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json'
         })
      });
  }
}
