import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
}
