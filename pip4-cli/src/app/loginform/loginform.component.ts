import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../user.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  errorMsg: string;

  constructor(private router:Router, private user:UserService) { }

  ngOnInit() {
  }

  loginUser(e) {
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;

    // TODO Доделать проверку с сервером
    if(username === 'admin' && password === 'admin') {
      this.user.setUserLoggedIn();
      this.errorMsg = '';
      this.router.navigate(['mainpage']);
    }  else {
      this.errorMsg = 'Вы ввели некорректное сочетание логина и пароля';
      return false;
    }

    return true;
  }

}
