import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Request,
  Req,
  UseGuards,
} from '@nestjs/common';

import { GroupService } from '../service/group.service';
import { Group } from '../model/group.interface';
import { JwtAuthGuard } from '@auth';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createGroup(@Body() group: Group, @Req() req): Promise<Group> {
    return this.groupService.create(group.name, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Request() req,
  ): Promise<Pagination<Group>> {
    limit = limit > 100 ? 100 : limit;

    const { items, meta } = await this.groupService.paginate(
      {
        page,
        limit,
      },
      req.user.id,
    );

    return { items, meta };
  }
}
