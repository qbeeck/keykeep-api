import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Request,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
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

  @Get('')
  @UseGuards(JwtAuthGuard)
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('search', new DefaultValuePipe('')) search: string = '',
    @Request() req,
  ): Promise<User[]> {
    limit = limit > 100 ? 100 : limit;

    const { items } = await this.userService.paginate(
      {
        page,
        limit,
      },
      req.user.id,
      search,
    );

    return items;
  }
}
