import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import config from "../../assets/config/dev-config.json";
import { HttpHelperService } from "../services/http-helper.service";

@Injectable()
export class CacheDataRepository {
  baseURL = config.API_ENDPOINTS.BASE_URL + "/flags";

  constructor(private httpHelper: HttpHelperService) {}

  public getRawCacheData(): Observable<any> {
    return this.httpHelper.get(this.baseURL);
  }
  public updateRawCacheData(obj): Observable<any> {
    return this.httpHelper.post(this.baseURL, obj);
  }
}
