import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CacheService } from '../../services/cache.service';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";
import { CacheData } from '../../models/cache-data.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  alertData = {};
  showAlert: Boolean = false;
  cacheData: CacheData;

  constructor(private router: Router, private cacheService: CacheService) { }

  ngOnInit() {
    interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.cacheService.getCacheData())
      )
      .subscribe(res => {
        this.cacheData = res;
        if(res['isAlertPresent']){
          this.showAlert = res['isAlertPresent'];
        }
      });
    if(!localStorage.getItem('token')){
      this.router.navigateByUrl('login');
    }
    this.alertData = {
      'message': 'Pollution alert : High in Dublin 3',
      'action' : ['Cancel', 'Take Action']
    };
  }
  updateAlertFlag(){
    this.showAlert = false;
    let obj = {
      'isAlertPresent' : false
    };
    this.cacheService.updateCacheData(obj).subscribe((v) => {
      console.log('Done', v);
    });
  }

}
