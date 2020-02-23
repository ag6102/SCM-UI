import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor(private http: HttpClient) {}

  createAuthorizationHeader() {
    let headers =  new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': localStorage.getItem('token')
    })
    return headers;
  }

  get(url) {
    let headers = this.createAuthorizationHeader();
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = this.createAuthorizationHeader();
    return this.http.post(url, data, {
      headers: headers
    });
  }
}
