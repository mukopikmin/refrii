import { Unit } from './unit';
import { Box } from './box';
import { User } from './user';

export class Food {
  constructor(
    public id: number,
    public name: string,
    public notice: string,
    public amount: number,
    public expirationDate: Date,
    public imageUrl: string,
    public base64image: string,
    public needsAdding: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public unit: Unit,
    public box: Box,
    public createdUser: User,
    public updatedUser: User
  ) { }

  public static parse(json: any): Food {
    const unit = json.unit ? Unit.parse(json.unit) : null;
    const box = json.box ? Box.parse(json.box) : null;
    const createdUser = json.created_user ? User.parse(json.created_user) : null
    const updatedUser = json.updated_user ? User.parse(json.updated_user) : null

    return new Food(
      json.id,
      json.name,
      json.notice,
      json.amount,
      new Date(json.expiration_date),
      json.image_url,
      null,
      json.needs_adding,
      new Date(json.created_at),
      new Date(json.updated_at),
      unit,
      box,
      createdUser,
      updatedUser
    );
  }

  public decrement(weight: number = 1) {
    if (this.amount - this.unit.step * weight < 0) {
      this.amount = 0;
    } else {
      this.amount -= this.unit.step * weight;
    }
  }

  public increment(weight: number = 1) {
    this.amount += this.unit.step * weight;
  }
}
