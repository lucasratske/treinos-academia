import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CONSTANTS from '../../constants/constants';
import 'rxjs/add/operator/map';

@Injectable()
export class TrainingProgramService {
  headers = new HttpHeaders();
  collName = "programs";
  constructor(public http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  getByUser(userId: string) {
    const apiUrl = `${CONSTANTS.DB_URL}${this.collName}?q={ userId: '${userId}' }&apiKey=${CONSTANTS.API_KEY}`;
    return this.http.get(
      apiUrl,
      { headers: this.headers });
  }

  getOneByUser(userId: string) {
    const apiUrl = `${CONSTANTS.DB_URL}${this.collName}?q={ userId: '${userId}', active: true }&fo=true&apiKey=${CONSTANTS.API_KEY}`;
    return this.http.get(
      apiUrl,
      { headers: this.headers });
  }
}
