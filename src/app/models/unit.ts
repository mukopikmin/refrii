export class Unit {
  private id: number;
  private label: string;
  private step: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(json) {
    this.id = json.id;
    this.label = json.label;
    this.step = json.step;
    this.createdAt = new Date(json.created_at);
    this.updatedAt = new Date(json.updated_at);
  }

  public getId(): number {
    return this.id;
  }

  public getStep(): number {
    return this.step;
  }
}
