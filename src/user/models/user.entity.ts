import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';

import { CredentialEntity } from '../../credential/model/credential.entity';
import { CardEntity } from '../../card/model/card.entity';

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

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
