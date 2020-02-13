import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { LoginComponent } from './screens/login/login.component';
import { DashboardTrackerComponent } from './screens/dashboard-tracker/dashboard-tracker.component';
import { AnalyticsComponent } from './screens/analytics/analytics.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  { path: 'dashboard', component: DashboardComponent, 
    children: [
      { path: '', redirectTo: 'tracker', pathMatch: 'full' },
      { path: 'tracker', component: DashboardTrackerComponent },
      { path: 'analytics', component: AnalyticsComponent }
    ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
