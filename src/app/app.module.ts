import { AbilityModule } from "@casl/angular";
import { createAbility } from "./ability";
import { Ability } from "@casl/ability";
import { LoaderComponent } from "./common-components/loader/loader.component";
import { LoaderService } from "./loader.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoaderInterceptor } from "./loader.interceptor";
import { LoginSvgComponent } from "./common-components/login-svg/login-svg.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/material.module";
import { MessageDialogComponent } from "./common-components/message-dialog/message-dialog.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SideNavComponent } from "./common-components/side-nav/side-nav.component";
import { LoginComponent } from "./screens/login/login.component";
import { DashboardComponent } from "./screens/dashboard/dashboard.component";
import { DashboardTrackerComponent } from "./screens/dashboard-tracker/dashboard-tracker.component";
import { MapsComponent } from "./common-components/maps/maps.component";
import { NotificationBarComponent } from "./common-components/notification-bar/notification-bar.component";
import { ViewListComponent } from "./common-components/view-list/view-list.component";
import { AlertComponent } from "./common-components/alert/alert.component";
import { HttpClientModule } from "@angular/common/http";
import { PollutionTrendGraphComponent } from "./common-components/pollution-trend-graph/pollution-trend-graph.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { AnalyticsComponent } from "./screens/analytics/analytics.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminPortalComponent } from "./screens/admin-portal/admin-portal.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { CacheDataRepository } from "./repositories/cache-data.repository";
import { AlertListComponent } from "./screens/alert-list/alert-list.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { CommunicationComponent } from "./communication/communication.component";
import { MatIcon, MatGridTile } from "@angular/material";
import { TimetableComponent } from "./common-components/timetable/timetable.component";

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
    PollutionTrendGraphComponent,
    AnalyticsComponent,
    AdminPortalComponent,
    AlertListComponent,
    TimetableComponent,
    LoaderComponent,
    LoginSvgComponent,
    CommunicationComponent,
    MessageDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatExpansionModule,
    AbilityModule.forRoot(),
  ],
  providers: [
    CacheDataRepository,
    { provide: Ability, useFactory: createAbility },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CommunicationComponent,
    MessageDialogComponent,
    TimetableComponent,
  ],
})
export class AppModule {}
