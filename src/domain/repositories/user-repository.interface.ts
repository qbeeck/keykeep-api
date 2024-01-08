import { User, UserId } from '../models/user';

export interface UserRepository {
  getById(id: UserId): Promise<User>;
  add(user: User): Promise<User>;
  update(user: User): Promise<User>;
  deleteById(id: UserId): Promise<void>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
}
