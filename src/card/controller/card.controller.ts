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
import { CardService } from '../service/card.service';
import { Card } from '../model/card.interface';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() card: Card, @Request() req): Promise<Card> {
    return this.cardService.create(req.user, card);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Card> {
    return this.cardService.findOne(id);
  }
}
