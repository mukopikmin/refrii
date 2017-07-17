import { Unit } from './unit';
import { Box } from './box';
import { User } from './user';

export class Food {
  private id: number;
  private name: string;
  private notice: string;
  private amount: number;
  private expirationDate: Date;
  private unit: Unit;
  private box: Box;
  private imageUrl: string;
  private base64image: string;
  private needsAdding: boolean;
  private createdAt: Date;
  private updatedAt: Date;
  private createdUser: User;
  private updatedUser: User;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.notice = json.notice;
    this.amount = json.amount;
    this.expirationDate = new Date(json.expiration_date);
    this.imageUrl = json.image_url;
    this.needsAdding = json.needs_adding;
    this.createdAt = new Date(json.created_at);
    this.updatedAt = new Date(json.updated_at);
  }

  public static parse(json: any) {
    const id = json.id;
    const name = json.name;
    const notice = json.notice;
    const amount = json.amount;
    const expirationDate = new Date(json.expiration_date);
    const imageUrl = json.image_url;
    const createdAt = new Date(json.created_at);
    const updatedAt = new Date(json.updated_at);
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

  public getAmount(): number {
    return this.amount;
  }

  public getExpirationDate(): Date {
    return this.expirationDate;
  }

  public getUnit(): Unit {
    return this.unit;
  }

  public getBox(): Box {
    return this.box;
  }

  public getImageUrl(): string { return this.imageUrl }
  public isNeedsAdding(): boolean { return this.needsAdding }

  public decrement(weight: number = 1) {
    this.amount -= this.unit.getStep() * weight;
  }

  public increment(weight: number = 1) {
    this.amount += this.unit.getStep() * weight;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setAmount(amount: number) {
    this.amount = amount;
  }

  public setExpirationDate(expirationDate: Date) {
    this.expirationDate = expirationDate;
  }

  public setUnit(unit: Unit) {
    this.unit = unit;
  }

  public setBox(box: Box) {
    this.box = box;
  }

  public setCreatedUser(user: User) { this.createdUser = user }
  public setUpdatedUser(user: User) { this.updatedUser = user }
  public setBase64image(str: string) { this.base64image = str }
  public setNeedsAdding(need: boolean) { this.needsAdding = need }
}
