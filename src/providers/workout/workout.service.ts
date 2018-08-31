import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CONSTANTS from '../../constants/constants';
import 'rxjs/add/operator/map';

@Injectable()
export class WorkoutService {
  headers = new HttpHeaders();
  collName = "workouts";
  constructor(public http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  getByProgram(trainingProgramId: string) {
    const apiUrl = `${CONSTANTS.DB_URL}${this.collName}?q={ trainingProgramId: '${trainingProgramId}' }&s={ order: 1 }&apiKey=${CONSTANTS.API_KEY}`;
    return this.http.get(
      apiUrl,
      { headers: this.headers });
  }
}
