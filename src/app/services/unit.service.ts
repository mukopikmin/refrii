import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { Unit } from '../models/unit';
import { Box } from '../models/box';

@Injectable()
export class UnitService {
  private endpoint: string = environment.endpoint;

  constructor(
    private authHttp: AuthHttp,
    private http: Http) { }

  public getUnits(box: Box = null): Promise<Unit[]> {
    let url;
    if (box === null) {
      url = `${this.endpoint}/units`
    } else {
      url = `${this.endpoint}/boxes/${box.getId()}/units`;
    }
    return this.authHttp.get(url)
      .toPromise()
      .then(response => {
        return response.json().map(json => new Unit(json));
      });
  }

  public createUnit(label: string): Promise<Unit> {
    const url = `${this.endpoint}/units`;
    const data = new FormData();
    data.append('label', label);

    return this.authHttp.post(url, data)
      .toPromise()
      .then(response => {
        return new Unit(response.json());
      });
  }

  public removeUnit(unit: Unit): Promise<void> {
    return this.authHttp.delete(`${this.endpoint}/units/${unit.getId()}`)
      .toPromise()
      .then(response => {
        return;
      });
  }
}
