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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPortalComponent } from './screens/admin-portal/admin-portal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

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
    AlertComponent,
    AdminPortalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
