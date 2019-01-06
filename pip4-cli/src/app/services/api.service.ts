import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UserResponse} from '../models/userResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:8080/pip4/api/users';

  constructor(private http: HttpClient) {}

  login(login: string, password: string) {
    return this.http.
    post<UserResponse>(`${this.baseUrl}/login`, {login, password},
      {headers: new HttpHeaders({
          'Content-Type' : 'application/json',
        })}).
    pipe(
      catchError(this.handleError)
    );
  }

  register(login: string, password: string) {
    return this.http.
    post<UserResponse>(`${this.baseUrl}/register`, {login, password},
      {headers: new HttpHeaders({
          'Content-Type' : 'application/json',
        })}).
    pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
