import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { CredentialEntity } from '../../credential/model/credential.entity';
import { CardEntity } from '../../card/model/card.entity';
import { GroupEntity } from '../../group/model/group.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ select: true })
  publicKeyRSA: string;

  @OneToMany(() => CredentialEntity, (credential) => credential.user)
  credentials: CredentialEntity[];

  @OneToMany(() => CardEntity, (card) => card.user)
  cards: CardEntity[];

  @ManyToMany(() => GroupEntity, (group) => group.users)
  @JoinTable()
  groups: GroupEntity[];

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
