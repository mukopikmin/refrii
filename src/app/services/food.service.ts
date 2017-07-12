import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { DatePipe } from '@angular/common';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { Food } from '../models/food';
import { Box } from '../models/box';
import { Unit } from '../models/unit';
import { User } from '../models/user';

@Injectable()
export class FoodService {
  private endpoint: string = environment.endpoint;

  constructor(
    private authHttp: AuthHttp,
    private http: Http,
    private datePipe: DatePipe) { }

  public getFood(id: number) {
    return this.authHttp.get(`${this.endpoint}/foods/${id}`)
      .toPromise()
      .then(response => {
        const json = response.json();
        const food = new Food(json);
        food.setBox(new Box(json.box));
        food.setUnit(new Unit(json.unit));
        food.setCreatedUser(new User(json.created_user));
        food.setUpdatedUser(new User(json.updated_user));
        return food;
      });
  }

  public getImage(food: Food): Promise<any> {
    const url = `${this.endpoint}/foods/${food.getId()}/image`;
    const params: URLSearchParams = new URLSearchParams();
    params.set('base64', 'true');

    return this.authHttp.get(url, { search: params })
      .toPromise()
      .then(response => {
        return response.json();
      });
  }

  public createFood(name: string, notice: string, amount: number, expirationDate: Date, unit: Unit, box: Box, image: File): Promise<Food> {
    const url = `${this.endpoint}/foods`;
    const data = new FormData();
    data.append('name', name);
    data.append('notice', notice || '');
    data.append('amount', amount.toString());
    data.append('expiration_date', this.datePipe.transform(expirationDate, 'yyyy-MM-dd'));
    data.append('image', image);
    data.append('unit_id', unit.getId().toString());
    data.append('box_id', box.getId().toString());

    return this.authHttp.post(url, data)
      .toPromise()
      .then(response => {
        return new Food(response.json());
      });
  }

  public removeFood(food: Food): Promise<void> {
    return this.authHttp.delete(`${this.endpoint}/foods/${food.getId()}`)
      .toPromise()
      .then(response => {
        return;
      });
  }

  public updateFood(food: Food): Promise<Food> {
    const data = new FormData();
    data.append('name', food.getName());
    data.append('notice', food.getNotice() || '');
    data.append('amount', food.getAmount().toString());
    data.append('expiration_date', this.datePipe.transform(food.getExpirationDate(), 'yyyy-MM-dd'));
    data.append('unit_id', food.getUnit().getId().toString());

    return this.authHttp.put(`${this.endpoint}/foods/${food.getId()}`, data)
      .toPromise()
      .then(response => {
        const json = response.json();
        const food = new Food(json);
        food.setBox(new Box(json.box));
        food.setUnit(new Unit(json.unit));
        return food;
      })
  }
}
