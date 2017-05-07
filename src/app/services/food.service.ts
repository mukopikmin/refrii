import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { DatePipe } from '@angular/common';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { Food } from '../models/food';
import { Box } from '../models/box';
import { Unit } from '../models/unit';

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
        return new Food(response.json());
      });
  }

  public createFood(name: string, notice: string, amount: number, expirationDate: Date, unit: Unit, box: Box): Promise<Food> {
    const url = `${this.endpoint}/foods`;
    const data = new FormData();
    data.append('name', name);
    data.append('notice', notice);
    data.append('amount', amount);
    data.append('expiration_date', this.datePipe.transform(expirationDate, 'yyyy-MM-dd'));
    data.append('unit_id', unit.getId());
    data.append('box_id', box.getId());

    return this.authHttp.post(url, data)
      .toPromise()
      .then(response => {
        return new Food(response.json());
      })
      .catch(error => {
        console.log(error);
      });
  }

  public removeFood(food: Food): Promise<void> {
    return this.authHttp.delete(`${this.endpoint}/foods/${food.getId()}`)
      .toPromise()
      .then(response => {
        return;
      })
      .catch(error => console.log(error));
  }
}
