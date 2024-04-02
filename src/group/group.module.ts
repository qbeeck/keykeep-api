import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { GroupEntity } from './model/group.entity';
import { GroupController } from './controller/group.controller';
import { GroupService } from './service/group.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity]), AuthModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
