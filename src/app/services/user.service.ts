import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { DatePipe } from '@angular/common';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Box } from '../models/box';

@Injectable()
export class UserService {
  private endpoint: string = environment.endpoint;

  constructor(
    private authHttp: AuthHttp,
    private http: Http,
    private datePipe: DatePipe) { }

  public getUserByEmail(email: string): Promise<User> {
    const url = `${this.endpoint}/users/search`;
    const params: URLSearchParams = new URLSearchParams();
    params.set('email', email);

    return this.authHttp.get(url, { search: params})
      .toPromise()
      .then(response => {
        return new User(response.json());
      });
  }

  public update(user: User, password: string, passwordConfirm: string): Promise<User> {
    const data = new FormData();
    data.append('name', user.getName());
    data.append('email', user.getEmail());
    if (password) {
      data.append('password', password);
      data.append('password_confirmation', passwordConfirm);
    }

    return this.authHttp.put(`${this.endpoint}/users/${user.getId()}`, data)
      .toPromise()
      .then(response => {
        return new User(response.json());
      });
  }
}
