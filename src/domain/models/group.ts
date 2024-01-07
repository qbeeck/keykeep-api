import { UserId } from './user';

export type GroupId = string;

export class Group {
  private _id: GroupId;
  private _name: string;
  private _creatorUserId: UserId;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: GroupId,
    name: string,
    creatorUserId: UserId,
    createdAt: Date,
  ) {
    this.validateName(name);

    this._id = id;
    this._name = name;
    this._creatorUserId = creatorUserId;
    this._createdAt = createdAt;
    this._updatedAt = createdAt;
  }

  updateName(name: string): void {
    this.validateName(name);

    this._name = name;
    this.updateUpdatedAt();
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Group name cannot be empty');
    }
  }

  private updateUpdatedAt(): void {
    this._updatedAt = new Date();
  }

  get id(): GroupId {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get creatorUserId(): UserId {
    return this._creatorUserId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
