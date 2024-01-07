import { GroupId } from './group';
import { UserId } from './user';

export type CredentialId = string;

export class Credential {
  private _id: CredentialId;
  private _userId: UserId;
  private _title: string;
  private _url: string;
  private _username: string;
  private _hashedPassword: string;
  private _description: string;
  private _sharedWithGroups: GroupId[];
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: CredentialId,
    userId: UserId,
    title: string,
    url: string,
    username: string,
    hashedPassword: string,
    description: string,
    sharedWithGroups: GroupId[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.validateUsername(username);
    this.validatePassword(hashedPassword);

    this._id = id;
    this._userId = userId;
    this._title = title;
    this._url = url;
    this._username = username;
    this._hashedPassword = hashedPassword;
    this._description = description;
    this._sharedWithGroups = sharedWithGroups;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  private validateUsername(username: string): void {
    if (!username || username.trim().length === 0) {
      throw new Error('Username cannot be empty');
    }
  }

  private validatePassword(hashedPassword: string): void {
    if (!hashedPassword) {
      throw new Error('Invalid or weak hashed password');
    }
  }

  get id(): CredentialId {
    return this._id;
  }
}
