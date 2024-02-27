import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CredentialEntity } from './model/credential.entity';
import { CredentialController } from './controller/credential.controller';
import { CredentialService } from './service/credential.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CredentialEntity]),
    AuthModule,
    UserModule,
  ],
  controllers: [CredentialController],
  providers: [CredentialService],
})
export class CredentialModule {}
