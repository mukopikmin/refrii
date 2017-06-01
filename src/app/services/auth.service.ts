import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { DatePipe } from '@angular/common';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable()
export class AuthService {
  private endpoint: string = environment.endpoint;

  constructor(
    private authHttp: AuthHttp,
    private http: Http,
    private datePipe: DatePipe) { }

    public verify(): boolean {
      const isNotExpired = tokenNotExpired('token');
      if (!isNotExpired) {
        localStorage.removeItem('token');
      }

      return isNotExpired;
    }

    public getSignedinUser(): Promise<User> {
      return this.authHttp.get(`${this.endpoint}/users/verify`)
        .toPromise()
        .then(response => {
          return new User(response.json());
        });
    }

    public signup(name: string, email: string, password: string, passwordConfirm: string): Promise<User> {
      const url = `${this.endpoint}/users`;
      const data = new URLSearchParams();
      data.append('name', name);
      data.append('email', email);
      data.append('password', password);
      data.append('password_confirmation', passwordConfirm);

      return this.http.post(url, data)
        .toPromise()
        .then(response => {
          return new User(response.json());
        })
        .catch(error => {
          console.log(error);
        });
    }

    public auth(email: string, password: string): any {
      const url = `${this.endpoint}/user_token`;
      const body = {
        auth: {
          email: email,
          password: password
        }
      };
      const headers = new Headers();
      headers.set('Content-Type', 'application/json');

      return this.http.post(url, JSON.stringify(body), { headers: headers})
        .toPromise()
        .then(response => {
          return response.json();
        })
        .catch(error => {
          console.log(error);
        });
    }
}
