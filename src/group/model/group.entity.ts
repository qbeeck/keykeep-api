import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { UserEntity } from '../../user/models/user.entity';
import { CredentialEntity } from '../../credential/model/credential.entity';

@Entity()
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.groups)
  users: UserEntity[];

  @OneToMany(() => CredentialEntity, (credential) => credential.group)
  credentials: CredentialEntity[];
}
