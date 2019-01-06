import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';

import {UserService} from './user.service';
import {AuthguardGuard} from './authguard.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {PointServiceService} from './services/point-service.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { LoginformComponent } from './loginform/loginform.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { RegisterComponent } from './register/register.component';
import {CanvasComponent} from './components/canvas.component';
import { HeaderComponent } from './header/header.component';
import {ExitMainGuard} from './services/exit.main.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginformComponent
  },
  {
    path: 'mainpage',
    canActivate: [AuthguardGuard],
    canDeactivate: [ExitMainGuard],
    component: MainpageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }];

@NgModule({
  declarations: [
    AppComponent, CanvasComponent, HeaderComponent,
    LoginformComponent, MainpageComponent, RegisterComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule, AutoCompleteModule, BrowserAnimationsModule,
    HttpClientModule, FormsModule, ScrollingModule,
    AppRoutingModule, ReactiveFormsModule,
    RouterModule.forRoot(appRoutes), CommonModule
  ],
  providers: [UserService, PointServiceService,
              AuthguardGuard, ExitMainGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
