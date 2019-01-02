import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template :
    `
    <div>
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
