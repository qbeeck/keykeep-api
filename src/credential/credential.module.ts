import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialEntity } from './model/credential.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
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
