import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CacheDataRepository {
    baseURL = "http://localhost:8000/data/flags/";

    constructor(private httpClient: HttpClient){}

    public getRawCacheData(): Observable<any> {
        return this.httpClient.get(this.baseURL, {
            headers: new HttpHeaders({
                 'Content-Type':  'application/json',
                 'Authorization': localStorage.getItem('token')
               })
            });
      }
    public updateRawCacheData(obj): Observable<any> {
        return this.httpClient.post(this.baseURL, obj, {
            headers: new HttpHeaders({
                 'Content-Type':  'application/json',
                 'Authorization': localStorage.getItem('token')
               })
            });
      }
}
