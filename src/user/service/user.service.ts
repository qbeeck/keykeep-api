import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Not, Repository } from 'typeorm';

import { AuthService } from '../../auth/services/auth.service';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  async create(user: User): Promise<void> {
    const newUser = new UserEntity();
    newUser.email = user.email;
    newUser.password = user.password;
    newUser.publicKeyRSA = user.publicKeyRSA;

    await this.userRepository.save(newUser);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    return user;
  }

  async login(user: User): Promise<string> {
    const validatedUser = await this.validateUser(user.email, user.password);

    const jwt = await this.authService.generateJWT(validatedUser);

    return jwt;
  }

  async paginate(
    options: IPaginationOptions,
    userId: number,
    searchValue?: string,
  ): Promise<Pagination<User>> {
    return paginate<User>(this.userRepository, options, {
      select: ['id', 'email', 'publicKeyRSA'],
      where: [
        {
          id: Not(userId),
          ...(searchValue && { email: Like(`%${searchValue}%`) }),
        },
      ],
    });
  }

  private async validateUser(
    email: string,
    passwordToCompare: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new HttpException(
        'Email or password not valid. Please try again.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const match = this.authService.comparePasswords(
      passwordToCompare,
      user.password,
    );

    if (!match) {
      throw new HttpException(
        'Email or password not valid. Please try again.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }
}
