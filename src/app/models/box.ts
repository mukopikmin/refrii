import { User } from './user';
import { Food } from './food';

export class Box {
  constructor(
    public id: number,
    public name: string,
    public notice: string,
    public isInvited: boolean,
    public imageUrl: string,
    public base64image: string,
    public createdAt: Date,
    public updatedAt: Date,
    public owner: User,
    public foods: Food[],
    public invitedUsers: User[]
  ) {}

  public static parse(json: any): Box {
    const owner = json.owner ? User.parse(json.owner) : null;
    const foods = json.foods ? json.foods.map(food => {
      return Food.parse(food);
    }) : null;
    const invitedUsers = json.invited_users ? json.invited_users.map(user => {
      return User.parse(user);
    }) : null;

    return new Box(
      json.id,
      json.name,
      json.notice,
      json.is_invited,
      json.imageUrl,
      null,
      new Date(json.crated_at),
      new Date(json.updated_at),
      owner,
      foods,
      invitedUsers
    );
  }
}

export enum BoxType {
  Available,
  Owns,
  Invited
}
