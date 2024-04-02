import { Group } from 'src/group';
import { User } from '../../user/models/user.interface';

export interface Credential {
  id?: number;
  title?: string;
  url?: string;
  username?: string;
  password?: string;
  isShared?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User;
  group?: Group;
}
