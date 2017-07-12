export class User {
  private id: number;
  private name: string;
  private email: string;
  private avatarUrl: string;
  private base64avatar: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.email = json.email;
    this.avatarUrl = json.avatar_url;
    this.createdAt = new Date(json.created_at);
    this.updatedAt = new Date(json.updated_at);
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getAvatarUrl():string {
    return this.avatarUrl;
  }

  public setBase64avatar(str: string) { this.base64avatar = str }
}
