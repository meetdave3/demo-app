import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MadinaAppsService {

  constructor(public _http: Http) { }

  login(username, password) {
    const body = {
      username: username,
      password: password
    };
    return this._http.post('/api/login/', body)
    .map(data => {
      return data.json();
    });
  }

  checkAccess() {
    return this._http.get('/api/checkaccess/')
    .map(data => {
      return data.json();
    });
  }

  getData() {
    return this._http.get('/api/getfamilydata/')
    .map(data => {
      return data.json();
    });
  }

}
