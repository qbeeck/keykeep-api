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
import { CardService } from '../service/card.service';
import { Card } from '../model/card.interface';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() card: Card, @Request() req): Promise<Card> {
    return this.cardService.create(req.user, card);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Request() req,
  ): Promise<Pagination<Card>> {
    limit = limit > 100 ? 100 : limit;

    const { items, meta } = await this.cardService.paginate(
      {
        page,
        limit,
      },
      req.user.id,
    );

    return { items, meta };
  }

  @Get('cardNumber/:id')
  @UseGuards(JwtAuthGuard)
  async getCardNumber(
    @Param('id') id: number,
    @Request() req,
  ): Promise<{ cardNumber: Card['cardNumber'] }> {
    return this.cardService.getCardNumber(id, req.user.id);
  }

  @Get('expirationDate/:id')
  @UseGuards(JwtAuthGuard)
  async getExpirationDate(
    @Param('id') id: number,
    @Request() req,
  ): Promise<{ expirationDate: Card['expirationDate'] }> {
    return this.cardService.getExpirationDate(id, req.user.id);
  }
}
