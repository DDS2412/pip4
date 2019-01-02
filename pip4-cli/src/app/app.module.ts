import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CanvasComponent} from './components/canvas.component';
import { HeaderComponent } from './header/header.component';
import { LoginformComponent } from './loginform/loginform.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { RouterModule, Routes} from '@angular/router';

import {UserService} from './user.service';
import {AuthguardGuard} from './authguard.guard';
import {FormsModule} from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {PointServiceService} from './services/point-service.service';

const appRoutes:Routes = [
  {
    path: '',
    component: LoginformComponent
  },
  {
    path: 'mainpage',
    canActivate: [AuthguardGuard],
    component: MainpageComponent
}]

@NgModule({
  declarations: [
    AppComponent, CanvasComponent, HeaderComponent, LoginformComponent, MainpageComponent
  ],
  imports: [
    BrowserModule, AutoCompleteModule,
    HttpClientModule, FormsModule, ScrollingModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes), CommonModule
  ],
  providers: [UserService, PointServiceService,
              AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
