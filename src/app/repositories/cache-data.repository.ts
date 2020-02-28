import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHelperService } from '../services/http-helper.service';
import config from '../../assets/config/dev-config.json';

@Injectable()
export class CacheDataRepository {
    //baseURL = "http://localhost:8000/data/flags/";
    baseURL = config.API_ENDPOINTS.AUTH_URL + "/data/flags/";
    constructor(private httpHelper: HttpHelperService){}

    public getRawCacheData(): Observable<any> {
        return this.httpHelper.get(this.baseURL);
      }
    public updateRawCacheData(obj): Observable<any> {
        return this.httpHelper.post(this.baseURL, obj);
      }
}
