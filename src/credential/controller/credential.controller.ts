import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-guard';
import { CredentialService } from '../service/credential.service';
import { Credential } from '../model/credential.interface';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('credentials')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() credential: Credential, @Request() req): Promise<Credential> {
    return this.credentialService.create(req.user, credential);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Request() req,
  ): Promise<Pagination<Credential>> {
    limit = limit > 100 ? 100 : limit;

    const { items, meta } = await this.credentialService.paginate(
      {
        page,
        limit,
      },
      req.user.id,
    );

    return { items, meta };
  }

  @Get('password/:id')
  @UseGuards(JwtAuthGuard)
  async getPassword(
    @Param('id') id: number,
    @Request() req,
  ): Promise<{ password: Credential['password'] }> {
    return this.credentialService.getPassword(id, req.user.id);
  }
}
