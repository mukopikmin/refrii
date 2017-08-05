export class Unit {
  constructor(
    public id: number,
    public label: string,
    public step: number,
    public createdAt: Date,
    public updatedAt: Date
  ) { }

  public static parse(json: any): Unit {
    return new Unit(
      json.id,
      json.label,
      json.step,
      new Date(json.crated_at),
      new Date(json.updated_at)
    );
  }
}
