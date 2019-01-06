import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {ComponentCanDeactivate} from '../services/exit.main.guard';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit, ComponentCanDeactivate {

  constructor(private user: UserService) { }

  ngOnInit() {
  }

   canDeactivate(): boolean | Observable<boolean> {
    this.user.breakСonnection();
    return true;
  }
}
