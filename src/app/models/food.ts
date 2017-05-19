import { Unit } from './unit';
import { Box } from './box';

export class Food {
  private id: number;
  private name: string;
  private notice: string;
  private amount: number;
  private expirationDate: Date;
  private unit: Unit;
  private box: Box;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.notice = json.notice;
    this.amount = json.amount;
    this.expirationDate = new Date(json.expiration_date);
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

  public getAmount(): number {
    return this.amount;
  }

  public getExpirationDate(): Date {
    return this.expirationDate;
  }

  public getBox(): Box {
    return this.box;
  }

  public decrement(weight: number = 1): void {
    this.amount -= this.unit.getStep() * weight;
  }

  public increment(weight: number = 1): void {
    this.amount += this.unit.getStep() * weight;
  }

  public setAmount(amount: number): void {
    this.amount = amount;
  }

  public setExpirationDate(expirationDate: Date): void {
    this.expirationDate = expirationDate;
  }

  public setUnit(unit: Unit): void {
    this.unit = unit;
  }

  public setBox(box: Box): void {
    this.box = box;
  }
}
