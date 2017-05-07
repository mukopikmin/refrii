import { User } from './user';
import { Food } from './food';

export class Box {
  private id: number;
  private name: string;
  private notice: string;
  private createdAt: Date;
  private updatedAt: Date;
  private user: User;
  private foods: Food[];

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.notice = json.notice;
    this.createdAt = new Date(json.created_at);
    this.updatedAt = new Date(json.updated_at);
  }

  public getId(): number {
    return this.id;
  }

  public getFoods(): Food[] {
    return this.foods;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public setFoods(foods: Food[]): void {
    this.foods = foods;
  }
}

export enum BoxType {
  Available,
  Owns,
  Invited
}
