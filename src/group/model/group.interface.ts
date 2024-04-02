import { User } from '../../user/models/user.interface';

export interface Group {
  id?: number;
  name?: string;
  users?: User[];
}
