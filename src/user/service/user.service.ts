import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthService } from '../../auth/services/auth.service';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  async create(user: User): Promise<User> {
    const newUser = new UserEntity();
    newUser.email = user.email;
    newUser.password = user.password;

    const createdUser = await this.userRepository.save(newUser);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = createdUser;

    return result;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }

  async login(user: User): Promise<string> {
    const validatedUser = await this.validateUser(user.email, user.password);

    const jwt = await this.authService.generateJWT(validatedUser);

    return jwt;
  }

  private async validateUser(
    email: string,
    passwordToCompare: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    const match = this.authService.comparePasswords(
      passwordToCompare,
      user.password,
    );

    if (!match) {
      throw Error;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }
}
