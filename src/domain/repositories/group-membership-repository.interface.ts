import { GroupId } from '../models/group';
import { GroupMembership, GroupMembershipId } from '../models/group-membership';
import { UserId } from '../models/user';

export interface GroupMembershipRepository {
  getById(id: GroupMembershipId): Promise<GroupMembership>;
  add(group: GroupId, userId: UserId): Promise<GroupMembership>;
  deleteById(id: GroupMembershipId): Promise<void>;
}
