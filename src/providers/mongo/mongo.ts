import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import * as CONSTANTS from '../../constants/constants';
import 'rxjs/add/operator/map';

@Injectable()
export class MongoProvider {
  headers = new Headers();

  constructor(public http: Http) {
    this.headers.append('Content-Type', 'application/json');
  }

  get(dbName: string, collectionId: string = "") {
    const apiUrl = (collectionId === "") ?
      CONSTANTS.DB_URL + dbName + "?apiKey=" + CONSTANTS.API_KEY :
      CONSTANTS.DB_URL + dbName + "/" + collectionId + "?apiKey=" + CONSTANTS.API_KEY;

    return this.http.get(
      apiUrl,
      { headers: this.headers })
      .map(res => res.json());
  }

  post(dbName: string, collection: any) {
    return this.http.post(
      CONSTANTS.DB_URL + dbName + "?apiKey=" + CONSTANTS.API_KEY,
      collection,
      { headers: this.headers })
      .map(res => res.json());
  }

  put(dbName: string, collection: any) {
    return this.http.put(
      CONSTANTS.DB_URL + dbName + "/" + collection._id.$oid + "?apiKey=" + CONSTANTS.API_KEY,
      collection,
      { headers: this.headers })
      .map(res => res.json());
  }

  delete(dbName: string, collectionId: string) {
    return this.http.delete(
      CONSTANTS.DB_URL + dbName + "/" + collectionId + "?apiKey=" + CONSTANTS.API_KEY,
      { headers: this.headers })
      .map(res => res.json());
  }
}
