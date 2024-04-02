import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  ManyToOne,
} from 'typeorm';

import { UserEntity } from '../../user/models/user.entity';

@Entity('credential_entity')
export class CredentialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  isShared: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.credentials)
  user: UserEntity;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
