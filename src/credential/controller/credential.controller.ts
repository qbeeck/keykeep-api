import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-guard';
import { CredentialService } from '../service/credential.service';
import { Credential } from '../model/credential.interface';

@Controller('credentials')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() credential: Credential, @Request() req): Promise<Credential> {
    return this.credentialService.create(req.user, credential);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Credential> {
    return this.credentialService.findOne(id);
  }
}
