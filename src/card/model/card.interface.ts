import { User } from '../../user/models/user.interface';

export interface Card {
  id?: number;
  title?: string;
  cardNumber?: string;
  expirationDate?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User;
}
