import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GroupEntity } from '../model/group.entity';
import { Group } from '../model/group.interface';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  async create(
    name: string,
    userIds: number[],
    userId: number,
  ): Promise<Group> {
    const group = this.groupRepository.create({
      name,
      users: [{ id: userId }, ...userIds.map((id) => ({ id }))],
    });

    return this.groupRepository.save(group);
  }

  async paginate(
    options: IPaginationOptions,
    userId: number,
  ): Promise<Pagination<Group>> {
    return paginate<Group>(this.groupRepository, options, {
      select: ['id', 'name'],
      where: [{ users: { id: userId } }],
    });
  }
}
