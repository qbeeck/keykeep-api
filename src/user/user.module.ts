import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { UserEntity } from './models/user.entity';
import { GroupEntity } from 'src/group';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, GroupEntity]), AuthModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
