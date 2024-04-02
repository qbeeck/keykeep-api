import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Delete,
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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id') id: number, @Request() req): Promise<Credential> {
    return this.credentialService.findOne(id, req.user.id);
  }

  @Delete('password/:id')
  @UseGuards(JwtAuthGuard)
  removeOne(
    @Param('id') credentialId: number,
    @Request() req,
  ): Promise<boolean> {
    return this.credentialService.removeOne(credentialId, req.user.id);
  }

  @Post('shared/:userId')
  @UseGuards(JwtAuthGuard)
  createShared(
    @Body() credential: Credential,
    @Param('userId') userId: number,
  ): Promise<Credential> {
    return this.credentialService.createShared(userId, credential);
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
  ): Promise<{ password: Credential['password']; isShared: boolean }> {
    return this.credentialService.getPassword(id, req.user.id);
  }
}
