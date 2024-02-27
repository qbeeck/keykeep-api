import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../user/models/user.interface';
import { CardEntity } from '../model/card.entity';
import { Card } from '../model/card.interface';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}

  async create(user: User, card: Card): Promise<Card> {
    card.user = user;

    const createdCredential = await this.cardRepository.save(card);

    const { id, title, cardNumber, createdAt } = createdCredential;

    return { id, title, cardNumber, createdAt };
  }

  async findOne(requestedId: number): Promise<Card> {
    const card = await this.cardRepository.findOne({
      where: { id: requestedId },
      relations: ['user'],
    });

    const { id, title, cardNumber, expirationDate, createdAt, updatedAt } =
      card;

    return { id, title, cardNumber, expirationDate, createdAt, updatedAt };
  }
}
