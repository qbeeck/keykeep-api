import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CardEntity } from './model/card.entity';
import { CardController } from './controller/card.controller';
import { CardService } from './service/card.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity]), AuthModule, UserModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
