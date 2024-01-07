import { GroupId } from './group';
import { UserId } from './user';

export type GroupMembershipId = string;

export class GroupMembership {
  private _id: GroupMembershipId;
  private _groupId: GroupId;
  private _userId: UserId;

  constructor(id: GroupMembershipId, groupId: GroupId, userId: UserId) {
    this.validateGroupId(groupId);
    this.validateUserId(userId);

    this._id = id;
    this._groupId = groupId;
    this._userId = userId;
  }

  private validateGroupId(groupId: GroupId): void {
    if (!groupId || groupId.trim().length === 0) {
      throw new Error('Group ID cannot be empty');
    }
  }

  private validateUserId(userId: UserId): void {
    if (!userId || userId.trim().length === 0) {
      throw new Error('User ID cannot be empty');
    }
  }

  get id(): GroupMembershipId {
    return this._id;
  }

  get groupId(): GroupId {
    return this._groupId;
  }

  get userId(): UserId {
    return this._userId;
  }
}
