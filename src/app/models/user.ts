export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public avatarUrl: string,
    public base64avatar: string,
    public createdAt: Date,
    public updatedAt: Date
  ) { }

  public static parse(json: any): User {
    return new User(
      json.id,
      json.name,
      json.email,
      json.avatar_url,
      null,
      new Date(json.created_at),
      new Date(json.updated_at)
    );
  }
}
