import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../user/models/user.interface';
import { CredentialEntity } from '../model/credential.entity';
import { Credential } from '../model/credential.interface';

@Injectable()
export class CredentialService {
  constructor(
    @InjectRepository(CredentialEntity)
    private readonly credentialRepository: Repository<CredentialEntity>,
  ) {}

  async create(user: User, credential: Credential): Promise<Credential> {
    credential.user = user;

    const createdCredential = await this.credentialRepository.save(credential);

    const { id, title, username, password } = createdCredential;

    return { id, title, username, password };
  }

  async findOne(requestedId: number): Promise<Credential> {
    const credential = await this.credentialRepository.findOne({
      where: { id: requestedId },
      relations: ['user'],
    });

    const { id, title, username, password, createdAt, updatedAt } = credential;

    return { id, title, username, password, createdAt, updatedAt };
  }
}
