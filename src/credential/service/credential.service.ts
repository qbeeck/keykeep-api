import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { User } from '../../user/models/user.interface';
import { CredentialEntity } from '../model/credential.entity';
import { Credential } from '../model/credential.interface';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { UserService } from '@user';

@Injectable()
export class CredentialService {
  constructor(
    @InjectRepository(CredentialEntity)
    private readonly credentialRepository: Repository<CredentialEntity>,
    private readonly userService: UserService,
  ) {}

  async create(user: User, credential: Credential): Promise<Credential> {
    credential.user = user;

    const createdCredential = await this.credentialRepository.save(credential);

    const { id, title, username, password } = createdCredential;

    return { id, title, username, password };
  }

  async removeOne(credentialId: number, userId: number): Promise<boolean> {
    const credential = await this.findOne(credentialId, userId);

    await this.credentialRepository.delete(credential.id);

    return true;
  }

  async updateCredential(
    id: number,
    updateCredential: Credential,
  ): Promise<Credential> {
    const credential = await this.credentialRepository.findOneBy({ id });

    if (!credential) {
      throw new Error('Credential not found');
    }

    credential.title = updateCredential.title;
    credential.url = updateCredential.url;
    credential.username = updateCredential.username;
    credential.password = updateCredential.password;
    credential.isShared = updateCredential.isShared;

    return await this.credentialRepository.save(credential);
  }

  async createShared(
    userId: number,
    credential: Credential,
  ): Promise<Credential> {
    const user = await this.userService.findOne(userId);

    credential.user = user;
    credential.isShared = true;

    const createdCredential = await this.credentialRepository.save(credential);

    const { id, title, username, password } = createdCredential;

    return { id, title, username, password };
  }

  async createForGroup(
    userId: number,
    credential: Credential,
    groupId: number,
  ): Promise<Credential> {
    const user = await this.userService.findOne(userId);

    credential.user = user;
    credential.isShared = true;
    credential.group = { id: groupId };

    const createdCredential = await this.credentialRepository.save(credential);

    const { id, title, username, password } = createdCredential;

    return { id, title, username, password };
  }

  async findOne(requestedId: number, userId: number): Promise<Credential> {
    const credential = await this.credentialRepository.findOne({
      where: { id: requestedId },
      relations: ['user'],
    });

    const {
      id,
      title,
      url,
      isShared,
      username,
      password,
      createdAt,
      updatedAt,
      user,
    } = credential;

    if (user.id !== userId) {
      throw new HttpException(
        'Not found such credential',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      id,
      title,
      url,
      username,
      isShared,
      password,
      createdAt,
      updatedAt,
    };
  }

  async paginate(
    options: IPaginationOptions,
    userId: number,
  ): Promise<Pagination<Credential>> {
    return paginate<Credential>(this.credentialRepository, options, {
      select: [
        'id',
        'title',
        'url',
        'username',
        'password',
        'isShared',
        'createdAt',
        'updatedAt',
      ],
      where: [{ user: { id: userId }, group: IsNull() }],
    });
  }

  async paginateForGroup(
    options: IPaginationOptions,
    userId: number,
    groupId: number,
  ): Promise<Pagination<Credential>> {
    return paginate<Credential>(this.credentialRepository, options, {
      select: [
        'id',
        'title',
        'url',
        'username',
        'password',
        'isShared',
        'createdAt',
        'updatedAt',
      ],
      where: [{ user: { id: userId }, group: { id: groupId } }],
    });
  }

  async getPassword(
    requestedId: number,
    userId: number,
  ): Promise<{ password: string; isShared: boolean }> {
    const { password, isShared } = await this.findOne(requestedId, userId);

    return { password, isShared };
  }
}
