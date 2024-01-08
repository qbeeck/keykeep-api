import { Group, GroupId } from '../models/group';

export interface GroupRepository {
  getById(id: GroupId): Promise<Group>;
  add(group: Group): Promise<Group>;
  update(group: Group): Promise<Group>;
  deleteById(id: GroupId): Promise<void>;
}
