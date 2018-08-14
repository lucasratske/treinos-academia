import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CONSTANTS from '../../constants/constants';
import 'rxjs/add/operator/map';

@Injectable()
export class MongoProvider {
  headers = new HttpHeaders();

  constructor(public http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  get(collName: string, collId: string = "") {
    const apiUrl = (collId === "") ?
      CONSTANTS.DB_URL + collName + "?apiKey=" + CONSTANTS.API_KEY :
      CONSTANTS.DB_URL + collName + "/" + collId + "?apiKey=" + CONSTANTS.API_KEY;

    return this.http.get(
      apiUrl,
      { headers: this.headers });
  }

  post(collName: string, collection: any) {
    return this.http.post(
      CONSTANTS.DB_URL + collName + "?apiKey=" + CONSTANTS.API_KEY,
      collection,
      { headers: this.headers });
  }

  put(collName: string, collection: any) {
    return this.http.put(
      CONSTANTS.DB_URL + collName + "/" + collection._id.$oid + "?apiKey=" + CONSTANTS.API_KEY,
      collection,
      { headers: this.headers });
  }

  delete(collName: string, collId: string) {
    return this.http.delete(
      CONSTANTS.DB_URL + collName + "/" + collId + "?apiKey=" + CONSTANTS.API_KEY,
      { headers: this.headers });
  }

  getByQuery(collName: string, query: string) {
    const apiUrl = `${CONSTANTS.DB_URL}${collName}?${query}&apiKey=${CONSTANTS.API_KEY}`
    return this.http.get(
      apiUrl,
      { headers: this.headers });
  }
}
