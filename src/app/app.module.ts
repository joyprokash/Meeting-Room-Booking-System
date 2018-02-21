import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.router';

import { AppComponent } from './app.component';
import { LogoutComponent } from './logout.component';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthguardGuard } from './authguard.guard';
import { BookComponent } from './book/book.component';
import { DefaultComponent } from './default/default.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    BookComponent,
    DefaultComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    routes,
    FormsModule,
    HttpModule
],
  providers: [AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
