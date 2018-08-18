import { User } from './../../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CONSTANTS from '../../constants/constants';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  headers = new HttpHeaders();
  collName = "users";
  constructor(public http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  getAccess(user: User) {
    const apiUrl = `${CONSTANTS.DB_URL}${this.collName}?q={ email: '${user.email}', password: '${user.password}' }&fo=true&apiKey=${CONSTANTS.API_KEY}`;
    return this.http.get(
      apiUrl,
      { headers: this.headers });
  }
}
