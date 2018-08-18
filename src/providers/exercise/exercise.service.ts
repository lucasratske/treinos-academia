import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CONSTANTS from '../../constants/constants';
import 'rxjs/add/operator/map';

@Injectable()
export class ExerciseService {
  headers = new HttpHeaders();
  collName = "exercises";
  constructor(public http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  getByWorkout(workoutId: string) {
    const apiUrl = `${CONSTANTS.DB_URL}${this.collName}?q={ workoutId: '${workoutId}' }&apiKey=${CONSTANTS.API_KEY}`;
    return this.http.get(
      apiUrl,
      { headers: this.headers });
  }
}
