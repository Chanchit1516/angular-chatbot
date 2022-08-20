import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialLayoutComponent } from './shares/material-layout/material-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginLayoutComponent } from './shares/login-layout/login-layout.component';
import { LoadingLayoutComponent } from './shares/loading-layout/loading-layout.component';
import { DatePipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './redux/reducer/counter.reducer';

@NgModule({
  declarations: [
    AppComponent,
    MaterialLayoutComponent,
    HomePageComponent,
    RoleManagementComponent,
    UserManagementComponent,
    LoginPageComponent,
    LoginLayoutComponent,
    LoadingLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ count: counterReducer })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
