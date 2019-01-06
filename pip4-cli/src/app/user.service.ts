import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  setUserLoggedIn(login: string) {
    localStorage.setItem('login', login);
  }

  breakСonnection(){
    localStorage.setItem('login', null);
  }

  getUserLogged() {
    return localStorage.getItem('login');
  }
}
