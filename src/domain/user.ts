export type UserId = string;

export class User {
  private _id: UserId;
  private _username: string;
  private _email: string;
  private _hashedPassword: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  private readonly MIN_PASSWORD_LENGTH = 8;

  constructor(
    id: UserId,
    username: string,
    email: string,
    hashedPassword: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.validateUsername(username);
    this.validateEmail(email);
    this.validatePassword(hashedPassword);

    this._id = id;
    this._username = username;
    this._email = email;
    this._hashedPassword = hashedPassword;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  changePassword(newHashedPassword: string): void {
    this.validatePassword(newHashedPassword);

    this._hashedPassword = newHashedPassword;
    this.updateUpdatedAt();
  }

  private validateUsername(username: string): void {
    if (!username || username.trim().length === 0) {
      throw new Error('Username cannot be empty');
    }
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  private validatePassword(hashedPassword: string): void {
    if (!hashedPassword || hashedPassword.length < this.MIN_PASSWORD_LENGTH) {
      throw new Error('Invalid or weak hashed password');
    }
  }

  private updateUpdatedAt(): void {
    this._updatedAt = new Date();
  }

  get id(): UserId {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get email(): string {
    return this._email;
  }

  get hashedPassword(): string {
    return this._hashedPassword;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
