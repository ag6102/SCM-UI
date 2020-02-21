import { Injectable } from '@angular/core';
import { CacheData } from '../models/cache-data.model';
import { Observable, of } from 'rxjs';
import { CacheDataRepository } from '../repositories/cache-data.repository';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(private repository: CacheDataRepository) { }
  public getCacheData(): Observable<CacheData> {
    return this.repository.getRawCacheData();
  }
}
