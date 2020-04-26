import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HttpHelperService {
  constructor(private http: HttpClient) {}

  createAuthorizationHeader(noAuthorization) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    });
    if (noAuthorization) {
      headers = new HttpHeaders({
        "Content-Type": "application/json",
      });
    }
    return headers;
  }

  get(url, noAuthorization = false) {
    let headers = this.createAuthorizationHeader(noAuthorization);
    return this.http.get(url, {
      headers: headers,
    });
  }

  post(url, data, noAuthorization = false) {
    let headers = this.createAuthorizationHeader(noAuthorization);
    return this.http.post(url, data, {
      headers: headers,
    });
  }
}
