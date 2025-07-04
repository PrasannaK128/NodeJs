import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {path:'signup',component:SignupComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'login',component:LoginComponent}
];
