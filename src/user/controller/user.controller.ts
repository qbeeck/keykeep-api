import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@auth';

import { UserService } from '../service/user.service';
import { User } from '../models/user.interface';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() user: User): Promise<boolean> {
    await this.userService.create(user);

    return true;
  }

  @Post('login')
  async login(@Body() user: User): Promise<any> {
    const jwt = await this.userService.login(user);

    return { access_token: jwt };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param() params): Promise<User> {
    return this.userService.findOne(params.id);
  }
}
