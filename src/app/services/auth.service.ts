import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable()
export class AuthService {
  private endpoint: string = environment.endpoint;

  constructor(
    private authHttp: AuthHttp,
    private router: Router,
    private http: Http,
    private datePipe: DatePipe) { }

    public getSignedinUser(): Promise<User> {
      return this.authHttp.get(`${this.endpoint}/users/verify`)
        .toPromise()
        .then(response => {
          localStorage.setItem('user', JSON.stringify(response.json()));
          return User.parse(response.json());
        });
    }

    public getUserFromStorage(): User {
      const user = localStorage.getItem('user');
      if (user) {
        return User.parse(JSON.parse(user));
      } else {
        return null;
      }
    }

    public signOut(): void {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['/signin']);
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
          return User.parse(response.json());
        });
    }

    public auth(email: string, password: string): any {
      const url = `${this.endpoint}/auth/local`;
      const body = {
        email: email,
        password: password
      };
      const headers = new Headers();
      headers.set('Content-Type', 'application/json');

      return this.http.post(url, JSON.stringify(body), { headers: headers})
        .toPromise()
        .then(response => {
          return response.json();
        });
    }

    public googleAuth(state: string, code: string): any {
      const params: URLSearchParams = new URLSearchParams();
      params.set('state', state);
      params.set('code', code);

      return this.http.get(`${this.endpoint}/auth/google/callback`, { search: params })
        .toPromise()
        .then(response => {
          return response.json();
        });
    }
}
