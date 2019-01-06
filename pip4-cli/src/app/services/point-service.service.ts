import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Point} from '../models/point';
import {UserService} from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class PointServiceService {
  baseUrl: string = 'http://localhost:8080/pip4/api/points';

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }

  constructor(private http: HttpClient,
              private user: UserService) { }

  getAllPoints() {
    return this.http.get<Point[]>(`${this.baseUrl}/all?login=${this.user.getUserLogged()}`);
  }

  /*addNewPoint(point: Point) {
    return this.http.get<Point[]>(`${this.baseUrl}/add?x=${point.x}&y=${point.y}&r=${point.r}`);
  }
 */
  addNewPoint(point: Point){
    const login = this.user.getUserLogged();
    return this.http.post<Point[]>(`${this.baseUrl}/add`,{login, point},
      {headers: new HttpHeaders({
          'Content-Type' : 'application/json'
        })});
  }
}
