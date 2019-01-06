import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../user.service';
import {UserResponse} from '../models/userResponse';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  logStatus: UserResponse;

  constructor(private router: Router,
              private user: UserService,
              private api: ApiService) { }

  ngOnInit() {
    this.logStatus = new UserResponse();
  }

  loginUser(e) {
    const username = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    this.api.
      login(username, password).
        subscribe(
        data => {
        this.logStatus = data;
        if (this.logStatus.success) {
            this.user.setUserLoggedIn(username);
            this.router.navigate(['mainpage']);
          }

          return this.logStatus.success;
      });
  }
}
