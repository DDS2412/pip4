import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }
}
