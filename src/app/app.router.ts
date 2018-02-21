import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { DefaultComponent } from './default/default.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout.component';
import { AuthguardGuard } from './authguard.guard';
import { BookComponent } from './book/book.component';

export const router:Routes = [
    //{ path: '', redirectTo: 'login',pathMatch: 'full' },
    { path: 'login', children:[
        {path: '', component: LoginComponent} ,
        { path: '' , component: DefaultComponent, outlet: 'default'}
     ] },
  //  { path: 'dashboard',canActivate:[AuthguardGuard] ,component: DashboardComponent },
    { path: 'dashboard',children:[
        {path: '', component: DashboardComponent,canActivate:[AuthguardGuard]} ,
        { path: '' , component: HeaderComponent, outlet: 'header'}
    ] },
    //{ path: 'profile',canActivate:[AuthguardGuard] ,component: ProfileComponent },
   // { path: 'book',canActivate:[AuthguardGuard] ,component: BookComponent },
    { path: 'book',children:[
        {path: '', component: BookComponent,canActivate:[AuthguardGuard]} ,
        { path: '' , component: HeaderComponent, outlet: 'header'}
    ] },
    { path: 'logout',children:[
        {path: '', component: LogoutComponent} ,
    ]}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
