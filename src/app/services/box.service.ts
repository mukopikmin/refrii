import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export class BoxService {
  private endpoint: string = environment.endpoint;

  constructor(private authHttp: AuthHttp, private http: Http) { }

  public verify(): boolean {
    return tokenNotExpired();
  }

  public getSignedinUser(): Promise<User> {
    return this.authHttp.get(`${this.endpoint}/verify`)
      .toPromise()
      .then(response => {
        return new User(response.json());
      })
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

  public getBoxes(): Promise<Box[]> {
    return this.authHttp.get(`${this.endpoint}/boxes`)
      .toPromise()
      .then(response => {
        return response.json().map(box => {
          return new Box(box);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  public getBox(id: number): Promise<Box> {
    return this.authHttp.get(`${this.endpoint}/boxes/${id}`)
      .toPromise()
      .then(response => {
        return new Box(response.json());
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export class Box {
  private id: number;
  private name: string;
  private notice: string;
  private createdAt: Date;
  private updatedAt: Date;
  private owner: User;
  private rooms: Room[];

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.notice = json.notice;
    this.createdAt = new Date(json.created_at);
    this.updatedAt = new Date(json.updated_at);
    this.owner = new User(json.owner);
    this.rooms = json.rooms.map(room => {
      return new Room(room);
    });
  }
}

export class User {
  private id: number;
  private name: string;
  private email: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.email = json.email;
    this.createdAt = new Date(json.created_at);
    this.updatedAt = new Date(json.updated_at);
  }
}

export class Room {
  private id: number;
  private name: string;
  private notice: string;
  private createdAt: Date;
  private updatedAt: Date;
  private foods: Food[];

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.notice = json.notice;
    this.createdAt = new Date(json.created_at);
    this.updatedAt = new Date(json.updated_at);
    this.foods = json.foods.map(food => {
      return new Food(food);
    });
  }
}

export class Food {
  private id: number;
  private name: string;
  private notice: string;
  private amount: number;
  private unit: string;
  private expirationDate: Date;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.notice = json.notice;
    this.amount = json.amount;
    this.unit = json.unit;
    this.expirationDate = new Date(json.expiration_date);
    this.createdAt = new Date(json.created_at);
    this.updatedAt = new Date(json.updated_at);
  }
}
