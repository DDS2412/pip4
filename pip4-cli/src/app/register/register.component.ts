import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../services/api.service';
import {UserResponse} from '../models/userResponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: []
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  regStatus: UserResponse;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.regStatus = new UserResponse();
  }

  onSubmit() {
    this.api.
      register(this.registerForm.value['login'], this.registerForm.value['password']).
      subscribe(
        data =>{
          this.regStatus = data;
        });
  }
}
