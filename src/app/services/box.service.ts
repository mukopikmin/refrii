import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { DatePipe } from '@angular/common';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { Box, BoxType } from '../models/box';
import { User } from '../models/user';
import { Food } from '../models/food';

@Injectable()
export class BoxService {
  private endpoint: string = environment.endpoint;

  constructor(
    private authHttp: AuthHttp,
    private http: Http,
    private datePipe: DatePipe) { }

  public getBoxes(type: number = BoxType.Available): Promise<Box[]> {
    let url = `${this.endpoint}/boxes`;
    switch (type) {
      case BoxType.Owns:
        url = `${url}/owns`;
        break;
      case BoxType.Invited:
        url = `${url}/invited`;
        break;
    }

    return this.authHttp.get(url)
      .toPromise()
      .then(response => {
        return response.json().map(json => {
          const box =  new Box(json);
          box.setUser(new User(json.user));
          box.setFoods(json.foods.map(food => {
            return new Food(food);
          }));
          return box;
        });
      });
  }

  public getBox(id: number): Promise<Box> {
    return this.authHttp.get(`${this.endpoint}/boxes/${id}`)
      .toPromise()
      .then(response => {
        const json = response.json();
        const box = new Box(json);
        box.setUser(new User(json.user));
        box.setFoods(json.foods.map(food => {
          return new Food(food);
        }));
        return box;
      });
  }

  public createBox(name: string, notice: string): Promise<Box> {
    const data = new FormData();
    data.append('name', name);
    data.append('notice', notice);

    return this.authHttp.post(`${this.endpoint}/boxes`, data)
      .toPromise()
      .then(response => {
        return new Box(response.json());
      });
  }

  public removeBox(box: Box): Promise<void> {
    return this.authHttp.delete(`${this.endpoint}/boxes/${box.getId()}`)
      .toPromise()
      .then(respones => {
        return;
      });
  }

  public inviteUser(user: User, box: Box): Promise<void> {
    const url = `${this.endpoint}/boxes/${box.getId()}/invite`;
    const data = new FormData();
    data.append('user_id', user.getId());

    return this.authHttp.post(url, data)
      .toPromise()
      .then(response => {
        return;
      });
  }
}
