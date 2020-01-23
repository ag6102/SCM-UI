import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './common-components/side-nav/side-nav.component';
import { LoginComponent } from './screens/login/login.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { DashboardTrackerComponent } from './screens/dashboard-tracker/dashboard-tracker.component';
import { MapsComponent } from './common-components/maps/maps.component';
import { NotificationBarComponent } from './common-components/notification-bar/notification-bar.component';
import { ViewListComponent } from './common-components/view-list/view-list.component';
import { AlertComponent } from './common-components/alert/alert.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    LoginComponent,
    DashboardComponent,
    DashboardTrackerComponent,
    MapsComponent,
    NotificationBarComponent,
    ViewListComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
