import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { CacheService } from './cache.service';
import { CacheData } from '../models/cache-data.model';
import { CacheDataRepository } from '../repositories/cache-data.repository';
import { HttpClient,HttpHeaders } from '@angular/common/http';


describe('CacheService', () => {
  // let service: CacheService;
  // let repository: CacheDataRepository;
  // beforeEach(() => {
    
  //   repository = new CacheDataRepository();
  //   service = new CacheService(repository);
  // });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
  // it('should return cache object', () => {
  //   service.getCacheData().subscribe({
  //     next: (cache: CacheData) => {
  //       expect(cache).toBeTruthy();
  //     }
  //   })
  // });
});
