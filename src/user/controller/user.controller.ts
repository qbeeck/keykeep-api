import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../models/user.interface';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    const createdUser = await this.userService.create(user);

    return createdUser;
  }

  @Post('login')
  async login(@Body() user: User): Promise<any> {
    const jwt = await this.userService.login(user);

    return { access_token: jwt };
  }

  @Get(':id')
  async findOne(@Param() params): Promise<User> {
    return this.userService.findOne(params.id);
  }
}
