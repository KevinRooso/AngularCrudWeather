import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { LogoutComponent } from './logout/logout.component';
import { SessionGuardService } from './shared/session-guard.service';
import { WeatherComponent } from './weather/weather.component';
import { WDashComponent } from './w-dash/w-dash.component';

const routes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent,canActivate: [SessionGuardService]
},{
  path: 'login',
  component: LoginComponent
},{
  path: 'error',
  component: ErrorComponent
},{
  path: 'logout',
  component: LogoutComponent  
},{
  path: 'weather',
  component: WDashComponent
},
{
  path:'',
  redirectTo:'weather',
  pathMatch:'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
