import { User } from '../../user/models/user.interface';

export interface Credential {
  id?: number;
  title?: string;
  url?: string;
  username?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User;
}
