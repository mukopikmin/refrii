import { User } from './user';
import { Food } from './food';

export class Box {
  private id: number;
  private name: string;
  private notice: string;
  private isInvited: boolean;
  private imageUrl: string;
  private base64image: string;
  private createdAt: Date;
  private updatedAt: Date;
  private owner: User;
  private foods: Food[];
  private invitedUsers: User[];

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.notice = json.notice;
    this.isInvited = json.is_invited;
    this.imageUrl = json.image_url;
    this.createdAt = new Date(json.created_at);
    this.updatedAt = new Date(json.updated_at);
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getNotice(): string {
    return this.notice;
  }

  public getIsInvited(): boolean {
    return this.isInvited;
  }

  public getFoods(): Food[] {
    return this.foods;
  }

  public getImageUrl(): string {
    return this.imageUrl;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setNotice(notice: string): void {
    this.notice = notice;
  }

  public setUser(user: User): void {
    this.owner = user;
  }

  public setFoods(foods: Food[]): void {
    this.foods = foods;
  }

  public setBase64image(str: string): void { this.base64image = str }
  public setInvitedUsers(users: User[]) { this.invitedUsers = users }
}

export enum BoxType {
  Available,
  Owns,
  Invited
}
