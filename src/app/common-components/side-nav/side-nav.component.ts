import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  selected = 'dashboard/tracker';

  constructor(private router: Router) { }

  ngOnInit() {
    this.selected = window.location.pathname;
  }

  navRedirect(pageName) {
    this.router.navigateByUrl(pageName);
    this.selected = pageName;
  }
}
