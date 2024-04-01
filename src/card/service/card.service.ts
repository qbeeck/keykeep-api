import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../user/models/user.interface';
import { CardEntity } from '../model/card.entity';
import { Card } from '../model/card.interface';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}

  async create(user: User, card: Card): Promise<Card> {
    card.user = user;

    const createdCard = await this.cardRepository.save(card);

    const { id, title, cardNumber, createdAt } = createdCard;

    return { id, title, cardNumber, createdAt };
  }

  private async findOne(requestedId: number, userId: number): Promise<Card> {
    const card = await this.cardRepository.findOne({
      where: { id: requestedId },
      relations: ['user'],
    });

    const {
      id,
      title,
      cardNumber,
      expirationDate,
      createdAt,
      updatedAt,
      user,
    } = card;

    if (user.id !== userId) {
      throw new HttpException('Not found such card', HttpStatus.NOT_FOUND);
    }

    return {
      id,
      title,
      cardNumber,
      expirationDate,
      createdAt,
      updatedAt,
      user,
    };
  }

  async paginate(
    options: IPaginationOptions,
    userId: number,
  ): Promise<Pagination<Card>> {
    return paginate<Card>(this.cardRepository, options, {
      select: ['id', 'title', 'createdAt'],
      where: [{ user: { id: userId } }],
    });
  }

  async getCardNumber(
    requestedId: number,
    userId: number,
  ): Promise<{ cardNumber: Card['cardNumber'] }> {
    const { cardNumber } = await this.findOne(requestedId, userId);

    return { cardNumber };
  }

  async getExpirationDate(
    requestedId: number,
    userId: number,
  ): Promise<{ expirationDate: Card['expirationDate'] }> {
    const { expirationDate } = await this.findOne(requestedId, userId);

    return { expirationDate };
  }
}
